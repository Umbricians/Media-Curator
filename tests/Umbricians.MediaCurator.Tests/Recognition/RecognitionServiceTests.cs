using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Umbraco.AI.Core.Chat;
using Umbraco.AI.Core.Profiles;
using Umbricians.MediaCurator;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;
using Umbricians.MediaCurator.Settings;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class RecognitionServiceTests
{
    private const string TestPizzaPath = "tests/images/test-pizza.jpg";

    private sealed class FakeChatService : IAIChatService
    {
        public string ResponseText = """{"description":"a red product photo","tags":[{"name":"Product-Shot","confidence":0.93},{"name":"red","confidence":1.4}]}""";
        public Queue<string> ResponseQueue = new();
        public int Calls;
        public List<ChatMessage> ReceivedMessages = [];

        private string DequeueResponse()
        {
            Calls++;
            return ResponseQueue.Count > 0 ? ResponseQueue.Dequeue() : ResponseText;
        }

        public Task<ChatResponse> GetChatResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
        {
            ReceivedMessages.AddRange(messages);
            return Task.FromResult(new ChatResponse(new ChatMessage(ChatRole.Assistant, DequeueResponse())));
        }

        public Task<ChatResponse> GetChatResponseAsync(Guid profileId, IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => GetChatResponseAsync(messages, options, cancellationToken);

        public IAsyncEnumerable<ChatResponseUpdate> GetStreamingChatResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public IAsyncEnumerable<ChatResponseUpdate> GetStreamingChatResponseAsync(Guid profileId, IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        /// <summary>Profile alias and requested reasoning effort of every inline chat call, in order.</summary>
        public List<(string? Profile, ReasoningEffort? Effort)> Requests = [];

        /// <summary>When set, a call that asks for a reasoning effort fails like a model that rejects it.</summary>
        public bool RejectReasoning;

        private static T? ReadBuilder<T>(Umbraco.AI.Core.InlineChat.AIChatBuilder builder, string property)
            => (T?)typeof(Umbraco.AI.Core.InlineChat.AIChatBuilder)
                .GetProperty(property, System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.NonPublic)!
                .GetValue(builder);

        public Task<ChatResponse> GetChatResponseAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, IEnumerable<ChatMessage> messages, CancellationToken cancellationToken = default)
        {
            var builder = new Umbraco.AI.Core.InlineChat.AIChatBuilder();
            configure(builder);
            // The builder's state is internal to Umbraco.AI; read it the way its chat service would.
            var effort = ReadBuilder<ChatOptions>(builder, "ChatOptions")?.Reasoning?.Effort;
            lock (Requests)
            {
                Requests.Add((ReadBuilder<string>(builder, "ProfileAlias"), effort));
            }

            if (RejectReasoning && effort is not null)
            {
                throw new InvalidOperationException("HTTP 400: Unsupported parameter: 'reasoning.effort' is not supported with this model.");
            }

            return GetChatResponseAsync(messages, null, cancellationToken);
        }

        public IAsyncEnumerable<ChatResponseUpdate> StreamChatResponseAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, IEnumerable<ChatMessage> messages, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public Task<IChatClient> CreateChatClientAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public Task<IChatClient> GetChatClientAsync(Guid? profileId = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();
    }

    private sealed class FakeMediaOps : IMediaOperations
    {
        public readonly Dictionary<string, string> Properties = [];
        public bool HasFile = true;
        public bool ThrowOnSet;
        public DateTime UpdateDate = new(2024, 6, 1, 12, 0, 0, DateTimeKind.Utc);
        public string Name = "photo.jpg";
        public byte[] FileBytes = [1, 2, 3];

        public IReadOnlyList<MediaItemInfo> GetItems(Guid s, bool r) => [];

        public MediaItemInfo? GetItem(Guid k)
            => new(k, Name, "Image", Guid.Empty, DateTime.UtcNow, UpdateDate, false);

        public string? GetPropertyValue(Guid k, string alias) => Properties.GetValueOrDefault(alias);

        public void SetPropertyValue(Guid k, string alias, string value)
        {
            if (ThrowOnSet) throw new InvalidOperationException("no such property");
            Properties[alias] = value;
        }

        public Stream? OpenFile(Guid k) => HasFile ? new MemoryStream(FileBytes) : null;

        public Guid EnsureFolderPath(Guid p, IReadOnlyList<string> s) => p;

        public void Move(Guid m, Guid t) { }

        public IReadOnlyList<MediaItemInfo> GetChildren(Guid folderKey) => [];
        public void MoveToRecycleBin(Guid mediaKey) { }
        public void Delete(Guid mediaKey) { }
        public void RestoreFromRecycleBin(Guid mediaKey, Guid parentKey) { }

        public void SortChildren(Guid folderKey, IReadOnlyList<Guid> orderedChildKeys) { }
    }

    private sealed class UppercaseEnricher : IRecognitionEnricher
    {
        public Task EnrichAsync(RecognitionContext context, CancellationToken ct = default)
        {
            context.Tags.Add(new AiTag("enriched", 1.0));
            return Task.CompletedTask;
        }
    }

    private static ClassificationSchemeCollection Schemes()
        => new(() => [new DeweyPublicDomainScheme(), new LccOutlineScheme()]);

    private static byte[] CreatePng(int width, int height)
    {
        using var image = new Image<Rgb24>(width, height);
        using var stream = new MemoryStream();
        image.SaveAsPng(stream);
        return stream.ToArray();
    }

    private static string ResolveWorkspaceFile(string relativePath)
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, relativePath);
            if (File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException($"Could not resolve workspace file '{relativePath}'.");
    }

    private static UmbracoAiRecognitionService Create(
        FakeMediaOps media,
        FakeChatService? chat,
        bool metadataOnly = false,
        IRecognitionEnricher? enricher = null,
        Action<MediaCuratorOptions>? configureOptions = null,
        FakeSettingsService? settings = null,
        IJevClassificationDecider? jev = null)
    {
        var services = new ServiceCollection();
        if (chat is not null)
        {
            services.AddSingleton<IAIChatService>(chat);
        }

        var optionsValue = new MediaCuratorOptions { MetadataOnly = metadataOnly };
        configureOptions?.Invoke(optionsValue);
        var options = new OptionsMonitorStub(optionsValue);
        var enrichers = new RecognitionEnricherCollection(() => enricher is null ? [] : [enricher]);
        settings ??= new FakeSettingsService();
        return new UmbracoAiRecognitionService(
            services.BuildServiceProvider(),
            media,
            Schemes(),
            enrichers,
            options,
            settings,
            NullLogger<UmbracoAiRecognitionService>.Instance,
            jev);
    }

    private sealed class FakeJev : IJevClassificationDecider
    {
        public bool IsConfigured { get; set; } = true;

        public Queue<string?> Picks = new();

        public List<ClassificationChoice> Choices = [];

        public Task<string?> ChooseAsync(ClassificationChoice choice, CancellationToken cancellationToken = default)
        {
            Choices.Add(choice);
            return Task.FromResult(Picks.Count > 0 ? Picks.Dequeue() : null);
        }
    }

    private const string DescribeResponse =
        """{"description":"a high-speed train at a station","tags":[{"name":"train","confidence":0.95}]}""";

    private sealed class OptionsMonitorStub : IOptionsMonitor<MediaCuratorOptions>
    {
        public OptionsMonitorStub(MediaCuratorOptions value) => CurrentValue = value;
        public MediaCuratorOptions CurrentValue { get; }
        public MediaCuratorOptions Get(string? name) => CurrentValue;
        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
    }

    private sealed class FakeSettingsService : IMediaCuratorSettingsService
    {
        public MediaCuratorSiteSettings Value { get; set; } = new();

        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(Value);

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
        {
            Value = settings;
            return Task.CompletedTask;
        }
    }

    [Fact]
    public async Task Analyzes_image_normalizes_tags_and_caches_result()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.NotNull(result);
        Assert.Equal("a red product photo", result!.Description);
        Assert.Equal("product-shot", result.Tags[0].Name); // lowercased
        Assert.Equal(1.0, result.Tags[1].Confidence);      // clamped
        Assert.True(media.Properties.ContainsKey(UmbracoAiRecognitionService.TagsPropertyAlias));
        Assert.Equal(1, chat.Calls);
    }

    [Fact]
    public async Task Sends_detected_image_media_type_to_chat()
    {
        var media = new FakeMediaOps
        {
            Name = "misleading.jpg",
            FileBytes = CreatePng(32, 32),
        };
        var chat = new FakeChatService();
        var service = Create(media, chat);

        await service.AnalyzeAsync(Guid.NewGuid());

        var dataContent = chat.ReceivedMessages
            .SelectMany(m => m.Contents)
            .OfType<DataContent>()
            .Single();
        Assert.Equal("image/png", dataContent.MediaType);
    }

    [Fact]
    public async Task Sends_same_prepared_image_bytes_that_are_written_to_test_folder()
    {
        var outputDir = Path.Combine(Path.GetTempPath(), "mc-service-prepared-test", Guid.NewGuid().ToString("N"));
        var media = new FakeMediaOps
        {
            Name = "test-pizza.jpg",
            FileBytes = File.ReadAllBytes(ResolveWorkspaceFile(TestPizzaPath)),
        };
        var chat = new FakeChatService();
        var service = Create(
            media,
            chat,
            configureOptions: o =>
            {
                o.MaxRecognitionEdgePixels = 512;
                o.RecognitionPreparedImageTestFolder = outputDir;
            });

        try
        {
            await service.AnalyzeAsync(Guid.NewGuid(), force: true);

            var written = Directory.GetFiles(outputDir, "*_prepared_*.jpg");
            Assert.Single(written);
            var writtenBytes = File.ReadAllBytes(written[0]);
            var dataContent = chat.ReceivedMessages
                .SelectMany(m => m.Contents)
                .OfType<DataContent>()
                .Single();
            Assert.Equal("image/jpeg", dataContent.MediaType);
            Assert.Equal(writtenBytes, dataContent.Data.ToArray());
        }
        finally
        {
            if (Directory.Exists(outputDir))
            {
                Directory.Delete(outputDir, recursive: true);
            }
        }
    }

    [Fact]
    public async Task Cached_result_short_circuits_without_an_ai_call()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"cached","confidence":0.5}],"description":"cached","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Equal("cached", result!.Tags[0].Name);
        Assert.Equal(0, chat.Calls);
    }

    [Fact]
    public async Task Force_reruns_recognition_despite_cache()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            """{"tags":[{"name":"cached","confidence":0.5}],"description":"cached"}""";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        Assert.Equal(1, chat.Calls);
        Assert.Equal("product-shot", result!.Tags[0].Name);
    }

    [Fact]
    public async Task Metadata_only_mode_makes_no_ai_calls()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var service = Create(media, chat, metadataOnly: true);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Null(result);
        Assert.Equal(0, chat.Calls);
    }

    [Fact]
    public async Task Missing_ai_service_returns_null_instead_of_throwing()
    {
        var service = Create(new FakeMediaOps(), chat: null);

        Assert.Null(await service.AnalyzeAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task Enrichers_run_before_persisting()
    {
        var media = new FakeMediaOps();
        var service = Create(media, new FakeChatService(), enricher: new UppercaseEnricher());

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Contains(result!.Tags, t => t.Name == "enriched");
        Assert.Contains("enriched", media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias]);
    }

    [Fact]
    public async Task Unprovisioned_cache_property_degrades_gracefully()
    {
        var media = new FakeMediaOps { ThrowOnSet = true };
        var service = Create(media, new FakeChatService());

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.NotNull(result); // analysis still returned, just not cached
    }

    [Theory]
    [InlineData("""{"description":"d","tags":[{"name":"a","confidence":0.5}]}""", "a")]
    [InlineData("```json\n{\"description\":\"d\",\"tags\":[{\"name\":\"b\",\"confidence\":0.5}]}\n```", "b")]
    public void Parse_handles_plain_and_fenced_json(string text, string expectedTag)
    {
        var result = UmbracoAiRecognitionService.Parse(text);

        Assert.Equal(expectedTag, result!.Tags[0].Name);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("not json at all")]
    [InlineData("```\nstill no json\n```")]
    public void Parse_returns_null_for_garbage(string? text)
    {
        Assert.Null(UmbracoAiRecognitionService.Parse(text));
    }

    [Fact]
    public async Task Scheme_analysis_persists_valid_classification_code()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"a camera photo","tags":[{"name":"photography","confidence":0.9}],"classificationCode":"770"}""",
        };
        var service = Create(
            media,
            chat,
            configureOptions: o => o.ClassificationMode = RecognitionClassificationMode.SingleShot);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Equal("770", result!.ClassificationCode);
        Assert.Equal("770", media.Properties[ClassificationProvider.CodePropertyAlias]);
        Assert.Contains("770", media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias]);
        Assert.Contains("ClassificationCode", media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias]);
    }

    [Fact]
    public async Task Invalid_classification_code_is_ignored_but_tags_persist()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"misc","tags":[{"name":"building","confidence":0.8}],"classificationCode":"XYZ999"}""",
        };
        var service = Create(
            media,
            chat,
            configureOptions: o => o.ClassificationMode = RecognitionClassificationMode.SingleShot);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Null(result!.ClassificationCode);
        Assert.False(media.Properties.ContainsKey(ClassificationProvider.CodePropertyAlias));
        Assert.Equal("building", result.Tags[0].Name);
    }

    [Fact]
    public async Task Existing_classification_code_is_not_overwritten_without_force()
    {
        var media = new FakeMediaOps();
        media.Properties[ClassificationProvider.CodePropertyAlias] = "700";
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"photo","tags":[{"name":"photography","confidence":0.9}],"classificationCode":"770"}""",
        };
        var service = Create(
            media,
            chat,
            configureOptions: o => o.ClassificationMode = RecognitionClassificationMode.SingleShot);

        await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Equal("700", media.Properties[ClassificationProvider.CodePropertyAlias]);
    }

    [Fact]
    public async Task Force_overwrites_existing_classification_code()
    {
        var media = new FakeMediaOps();
        media.Properties[ClassificationProvider.CodePropertyAlias] = "700";
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"photo","tags":[{"name":"photography","confidence":0.9}],"classificationCode":"770"}""",
        };
        var service = Create(
            media,
            chat,
            configureOptions: o => o.ClassificationMode = RecognitionClassificationMode.SingleShot);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal("770", media.Properties[ClassificationProvider.CodePropertyAlias]);
    }

    [Fact]
    public async Task Cached_tags_without_code_reruns_when_scheme_requested()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"cached","confidence":0.5}],"description":"cached description","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "cached description";
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"700"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"770"}""");
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Equal(2, chat.Calls);
        Assert.Equal("770", result!.ClassificationCode);
    }

    [Fact]
    public async Task Stored_description_skips_vision_for_hierarchical_classification()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"train","confidence":0.9}],"description":"train at station","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "train at station";
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Equal("385", result!.ClassificationCode);
        Assert.Equal(3, chat.Calls);
        Assert.Equal("train at station", media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias]);
    }

    [Fact]
    public async Task Vision_persists_description_when_setup_enabled()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"a red product photo","tags":[{"name":"product-shot","confidence":0.93}]}""",
        };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { PersistImageDescription = true } };
        var service = Create(media, chat, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Equal("a red product photo", media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias]);
    }

    [Fact]
    public async Task Legacy_cache_without_source_update_date_reruns_vision()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            """{"tags":[{"name":"blinds","confidence":0.5}],"description":"window blinds"}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "window blinds";
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"a pizza with toppings","tags":[{"name":"pizza","confidence":0.95}]}""",
        };
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Equal(1, chat.Calls);
        Assert.Equal("a pizza with toppings", result!.Description);
    }

    [Fact]
    public async Task Stale_cache_reruns_vision_after_media_file_update()
    {
        var media = new FakeMediaOps();
        var originalUpdate = new DateTime(2024, 6, 1, 12, 0, 0, DateTimeKind.Utc);
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"blinds","confidence":0.5}],"description":"window blinds","sourceUpdateDate":"{{originalUpdate:O}}"}""";
        media.UpdateDate = originalUpdate.AddHours(2);
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"a pizza with toppings","tags":[{"name":"pizza","confidence":0.95}]}""",
        };
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.Equal(1, chat.Calls);
        Assert.Equal("a pizza with toppings", result!.Description);
    }

    [Fact]
    public async Task Hierarchical_scheme_drills_down_and_persists_leaf_code()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(
            """{"description":"high-speed train at a railway station","tags":[{"name":"train","confidence":0.95}]}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");

        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.Equal("385", result!.ClassificationCode);
        Assert.Equal("385", media.Properties[ClassificationProvider.CodePropertyAlias]);
        Assert.Equal(4, chat.Calls);
        Assert.Equal("train", result.Tags[0].Name);
    }

    [Fact]
    public async Task Resizes_to_the_image_size_setting()
    {
        var media = new FakeMediaOps { Name = "wide.png", FileBytes = CreatePng(2000, 1000) };
        var chat = new FakeChatService();
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { RecognitionImageSize = 512 } };
        var service = Create(media, chat, configureOptions: o => o.MaxRecognitionEdgePixels = 1024, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        var sent = chat.ReceivedMessages.SelectMany(m => m.Contents).OfType<DataContent>().Single();
        using var image = Image.Load(sent.Data.ToArray());
        Assert.Equal(512, image.Width);
    }

    [Fact]
    public async Task Description_and_decisions_use_their_own_profile_and_reasoning_effort()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");
        var settings = new FakeSettingsService
        {
            Value = new MediaCuratorSiteSettings
            {
                DescriptionProfileAlias = "vision-profile",
                DescriptionReasoningEffort = AiReasoningEffort.Low,
                DecisionProfileAlias = "decision-profile",
                DecisionReasoningEffort = AiReasoningEffort.None,
            },
        };
        var service = Create(media, chat, settings: settings);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal("385", result!.ClassificationCode);
        Assert.Equal(("vision-profile", ReasoningEffort.Low), chat.Requests[0]);
        Assert.All(chat.Requests.Skip(1), r => Assert.Equal(("decision-profile", ReasoningEffort.None), r));
    }

    [Fact]
    public async Task Decisions_fall_back_to_the_description_profile_then_the_configured_recognition_profile()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        var settings = new FakeSettingsService
        {
            Value = new MediaCuratorSiteSettings { DescriptionReasoningEffort = AiReasoningEffort.Default },
        };
        var service = Create(media, chat, configureOptions: o => { o.RecognitionProfileAlias = "appsettings-profile"; o.MaxClassificationDepth = 1; }, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal(("appsettings-profile", (ReasoningEffort?)null), chat.Requests[0]);
        Assert.Equal("appsettings-profile", chat.Requests[1].Profile);
    }

    [Fact]
    public async Task Retries_without_reasoning_effort_when_the_model_rejects_it()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService { RejectReasoning = true };
        var profile = $"no-reasoning-{Guid.NewGuid():N}";
        var settings = new FakeSettingsService
        {
            Value = new MediaCuratorSiteSettings
            {
                DescriptionProfileAlias = profile,
                DescriptionReasoningEffort = AiReasoningEffort.Low,
            },
        };
        var service = Create(media, chat, settings: settings);

        var first = await service.AnalyzeAsync(Guid.NewGuid(), force: true);
        var second = await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        Assert.NotNull(first);
        Assert.NotNull(second);
        // Rejected once, retried without; the next analysis no longer asks for it.
        Assert.Equal([ReasoningEffort.Low, null, null], chat.Requests.Select(r => r.Effort).ToArray());
    }

    [Fact]
    public async Task Jev_makes_the_decisions_when_selected()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        var jev = new FakeJev { Picks = new Queue<string?>(["300", "380", "385"]) };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DecisionEngine = DecisionEngine.Jev } };
        var service = Create(media, chat, settings: settings, jev: jev);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal("385", result!.ClassificationCode);
        Assert.Equal(1, chat.Calls); // only the image description went to Umbraco.AI
        Assert.Equal("a high-speed train at a station", jev.Choices[0].Description);
        Assert.Equal("380", jev.Choices[2].Parent!.Code);
    }

    [Fact]
    public async Task A_failed_Jev_decision_falls_back_to_Umbraco_AI()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        var jev = new FakeJev { Picks = new Queue<string?>(["300", null]) };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DecisionEngine = DecisionEngine.Jev } };
        var service = Create(media, chat, configureOptions: o => o.MaxClassificationDepth = 2, settings: settings, jev: jev);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal("380", result!.ClassificationCode);
        Assert.Equal(2, chat.Calls);
    }

    [Fact]
    public async Task Jev_without_an_api_key_uses_Umbraco_AI()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        var jev = new FakeJev { IsConfigured = false, Picks = new Queue<string?>(["900"]) };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DecisionEngine = DecisionEngine.Jev } };
        var service = Create(media, chat, configureOptions: o => o.MaxClassificationDepth = 1, settings: settings, jev: jev);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.Equal("300", result!.ClassificationCode);
        Assert.Empty(jev.Choices);
    }
}
