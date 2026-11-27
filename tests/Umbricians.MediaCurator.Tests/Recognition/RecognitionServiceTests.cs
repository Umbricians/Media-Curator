using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
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
            // Umbraco.AI drops ChatOptions.Reasoning on this path, so it must never carry one.
            Assert.That(ReadBuilder<ChatOptions>(builder, "ChatOptions")?.Reasoning, Is.Null);
            lock (Requests)
            {
                Requests.Add((ReadBuilder<string>(builder, "ProfileAlias"), null));
            }

            return GetChatResponseAsync(messages, null, cancellationToken);
        }

        public IAsyncEnumerable<ChatResponseUpdate> StreamChatResponseAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, IEnumerable<ChatMessage> messages, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        /// <summary>Calls that went through a client from CreateChatClientAsync (the reasoning-effort path).</summary>
        public int ClientCalls;

        public Task<IChatClient> CreateChatClientAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, CancellationToken cancellationToken = default)
        {
            var builder = new Umbraco.AI.Core.InlineChat.AIChatBuilder();
            configure(builder);
            return Task.FromResult<IChatClient>(new FakeClient(this, ReadBuilder<string>(builder, "ProfileAlias")));
        }

        private sealed class FakeClient(FakeChatService owner, string? profile) : IChatClient
        {
            public Task<ChatResponse> GetResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            {
                var effort = options?.Reasoning?.Effort;
                lock (owner.Requests)
                {
                    owner.Requests.Add((profile, effort));
                    owner.ClientCalls++;
                }

                if (owner.RejectReasoning && effort is not null)
                {
                    throw new InvalidOperationException("HTTP 400: Unsupported parameter: 'reasoning.effort' is not supported with this model.");
                }

                return owner.GetChatResponseAsync(messages, null, cancellationToken);
            }

            public IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
                => throw new NotSupportedException();

            public object? GetService(Type serviceType, object? serviceKey = null) => null;

            public void Dispose() { }
        }

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

        public int Saves;

        public void SetPropertyValue(Guid k, string alias, string value)
        {
            if (ThrowOnSet) throw new InvalidOperationException("no such property");
            Properties[alias] = value;
            Saves++;
        }

        public IReadOnlySet<string> SetPropertyValues(Guid k, IReadOnlyDictionary<string, string> values)
        {
            if (ThrowOnSet) throw new InvalidOperationException("no such property");
            var changed = false;
            foreach (var (alias, value) in values)
            {
                changed |= Properties.GetValueOrDefault(alias) != value;
                Properties[alias] = value;
            }

            if (changed) Saves++;
            return values.Keys.ToHashSet();
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
        Action<MediaCuratorSiteSettings>? configure = null,
        FakeSettingsService? settings = null,
        IJevClassificationDecider? jev = null)
    {
        var services = new ServiceCollection();
        if (chat is not null)
        {
            services.AddSingleton<IAIChatService>(chat);
        }

        var enrichers = new RecognitionEnricherCollection(() => enricher is null ? [] : [enricher]);
        settings ??= new FakeSettingsService();
        if (metadataOnly)
        {
            settings.Value.AiEnabled = false;
        }

        configure?.Invoke(settings.Value);
        return new UmbracoAiRecognitionService(
            services.BuildServiceProvider(),
            media,
            Schemes(),
            enrichers,
            settings,
            NullLogger<UmbracoAiRecognitionService>.Instance,
            jev);
    }

    private sealed class FakeJev : IJevClassificationDecider
    {
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

    private sealed class FakeSettingsService : IMediaCuratorSettingsService
    {
        public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult<string?>(null);

        public Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default) => Task.CompletedTask;

        public MediaCuratorSiteSettings Value { get; set; } = new();

        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(Value);

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
        {
            Value = settings;
            return Task.CompletedTask;
        }
    }

    [Test]
    public async Task Analyzes_image_normalizes_tags_and_caches_result()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Description, Is.EqualTo("a red product photo"));
        Assert.That(result.Tags[0].Name, Is.EqualTo("product-shot")); // lowercased
        Assert.That(result.Tags[1].Confidence, Is.EqualTo(1.0));      // clamped
        Assert.That(media.Properties.ContainsKey(UmbracoAiRecognitionService.TagsPropertyAlias), Is.True);
        Assert.That(chat.Calls, Is.EqualTo(1));
    }

    [Test]
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
        Assert.That(dataContent.MediaType, Is.EqualTo("image/png"));
    }

    [Test]
    public async Task Sends_same_prepared_image_bytes_that_are_written_to_test_folder()
    {
        var outputDir = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), MediaCuratorDefaults.PreparedImagesFolder));
        var mediaKey = Guid.NewGuid();
        var media = new FakeMediaOps
        {
            Name = "test-pizza.jpg",
            FileBytes = File.ReadAllBytes(ResolveWorkspaceFile(TestPizzaPath)),
        };
        var chat = new FakeChatService();
        var service = Create(
            media,
            chat,
            configure: s =>
            {
                s.RecognitionImageSize = 512;
                s.SavePreparedImages = true;
            });

        try
        {
            await service.AnalyzeAsync(mediaKey, force: true);

            var written = Directory.GetFiles(outputDir, $"*{mediaKey:N}*_prepared_*.jpg");
            Assert.That(written, Has.Exactly(1).Items);
            var writtenBytes = File.ReadAllBytes(written[0]);
            var dataContent = chat.ReceivedMessages
                .SelectMany(m => m.Contents)
                .OfType<DataContent>()
                .Single();
            Assert.That(dataContent.MediaType, Is.EqualTo("image/jpeg"));
            Assert.That(dataContent.Data.ToArray(), Is.EqualTo(writtenBytes));
        }
        finally
        {
            foreach (var file in Directory.Exists(outputDir) ? Directory.GetFiles(outputDir, $"*{mediaKey:N}*") : [])
            {
                File.Delete(file);
            }
        }
    }

    [Test]
    public async Task Cached_result_short_circuits_without_an_ai_call()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"cached","confidence":0.5}],"description":"cached","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.That(result!.Tags[0].Name, Is.EqualTo("cached"));
        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task Force_reruns_recognition_despite_cache()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            """{"tags":[{"name":"cached","confidence":0.5}],"description":"cached"}""";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(result!.Tags[0].Name, Is.EqualTo("product-shot"));
    }

    [Test]
    public async Task Metadata_only_mode_makes_no_ai_calls()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var service = Create(media, chat, metadataOnly: true);

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.That(result, Is.Null);
        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task Missing_ai_service_returns_null_instead_of_throwing()
    {
        var service = Create(new FakeMediaOps(), chat: null);

        Assert.That(await service.AnalyzeAsync(Guid.NewGuid()), Is.Null);
    }

    [Test]
    public async Task Enrichers_run_before_persisting()
    {
        var media = new FakeMediaOps();
        var service = Create(media, new FakeChatService(), enricher: new UppercaseEnricher());

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.That(result!.Tags.Any(t => t.Name == "enriched"), Is.True);
        Assert.That(media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias], Does.Contain("enriched"));
    }

    [Test]
    public async Task Unprovisioned_cache_property_degrades_gracefully()
    {
        var media = new FakeMediaOps { ThrowOnSet = true };
        var service = Create(media, new FakeChatService());

        var result = await service.AnalyzeAsync(Guid.NewGuid());

        Assert.That(result, Is.Not.Null); // analysis still returned, just not cached
    }

    [TestCase("""{"description":"d","tags":[{"name":"a","confidence":0.5}]}""", "a")]
    [TestCase("```json\n{\"description\":\"d\",\"tags\":[{\"name\":\"b\",\"confidence\":0.5}]}\n```", "b")]
    public void Parse_handles_plain_and_fenced_json(string text, string expectedTag)
    {
        var result = UmbracoAiRecognitionService.Parse(text);

        Assert.That(result!.Tags[0].Name, Is.EqualTo(expectedTag));
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("not json at all")]
    [TestCase("```\nstill no json\n```")]
    public void Parse_returns_null_for_garbage(string? text)
    {
        Assert.That(UmbracoAiRecognitionService.Parse(text), Is.Null);
    }

    [Test]
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
            configure: s => s.ClassificationMethod = ClassificationMethod.SingleCall);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("770"));
        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("770"));
        Assert.That(media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias], Does.Contain("770"));
        Assert.That(media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias], Does.Contain("ClassificationCode"));
    }

    [Test]
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
            configure: s => s.ClassificationMethod = ClassificationMethod.SingleCall);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.Null);
        Assert.That(media.Properties.ContainsKey(ClassificationProvider.CodePropertyAlias), Is.False);
        Assert.That(result.Tags[0].Name, Is.EqualTo("building"));
    }

    [Test]
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
            configure: s => s.ClassificationMethod = ClassificationMethod.SingleCall);

        await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("700"));
    }

    [Test]
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
            configure: s => s.ClassificationMethod = ClassificationMethod.SingleCall);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("770"));
    }

    [Test]
    public async Task Small_schemes_pick_the_final_code_in_one_decision_with_main_classes_shown()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(
            """{"description":"three friends taking a selfie at an airport","tags":[{"name":"selfie","confidence":0.95}]}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"910"}""");
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("910"));
        Assert.That(chat.Calls, Is.EqualTo(2));
        var prompt = chat.ReceivedMessages.Last().Text;
        Assert.That(prompt, Does.Contain("910|Geography and Travels (History)"));
        Assert.That(prompt, Does.Contain("790|Amusements (Fine Arts)"));
        Assert.That(prompt, Does.Contain("385|Railroad Transportation (Sociology › Commerce and Communication)"));
        Assert.That(prompt, Does.Not.Contain("\n300|Sociology")); // classes with sub-categories are not final codes
    }

    [Test]
    public async Task Cached_tags_without_code_reruns_when_scheme_requested()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"cached","confidence":0.5}],"description":"cached description","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "cached description";
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"770"}""");
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(result!.ClassificationCode, Is.EqualTo("770"));
    }

    [Test]
    public async Task Stored_description_skips_vision_for_hierarchical_classification()
    {
        var media = new FakeMediaOps();
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] =
            $$"""{"tags":[{"name":"train","confidence":0.9}],"description":"train at station","sourceUpdateDate":"{{media.UpdateDate:O}}"}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "train at station";
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");
        var service = Create(media, chat);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("385"));
        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias], Is.EqualTo("train at station"));
    }

    [Test]
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

        Assert.That(media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias], Is.EqualTo("a red product photo"));
    }

    [Test]
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

        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(result!.Description, Is.EqualTo("a pizza with toppings"));
    }

    [Test]
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

        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(result!.Description, Is.EqualTo("a pizza with toppings"));
    }

    [Test]
    public async Task Hierarchical_scheme_drills_down_and_persists_leaf_code()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(
            """{"description":"high-speed train at a railway station","tags":[{"name":"train","confidence":0.95}]}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");

        var service = Create(media, chat, configure: s => s.ClassificationMethod = ClassificationMethod.StepByStep);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("385"));
        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("385"));
        Assert.That(chat.Calls, Is.EqualTo(4));
        Assert.That(result.Tags[0].Name, Is.EqualTo("train"));
    }

    [Test]
    public async Task Step_by_step_analysis_saves_the_item_once()
    {
        // Each save raises "media saved", which starts a "Media Saved" automation once per save.
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(
            """{"description":"high-speed train at a railway station","tags":[{"name":"train","confidence":0.95}]}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"300"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"380"}""");
        chat.ResponseQueue.Enqueue("""{"classificationCode":"385"}""");
        var service = Create(
            media,
            chat,
            configure: s =>
            {
                s.ClassificationMethod = ClassificationMethod.StepByStep;
                s.PersistImageDescription = true;
            });

        await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(media.Saves, Is.EqualTo(1));
        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("385"));
        Assert.That(media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias], Is.EqualTo("high-speed train at a railway station"));
        Assert.That(media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias], Does.Contain("385"));
    }

    [Test]
    public async Task Single_call_analysis_saves_the_item_once()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService
        {
            ResponseText = """{"description":"a camera photo","tags":[{"name":"photography","confidence":0.9}],"classificationCode":"770"}""",
        };
        var service = Create(
            media,
            chat,
            configure: s =>
            {
                s.ClassificationMethod = ClassificationMethod.SingleCall;
                s.PersistImageDescription = true;
            });

        await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");

        Assert.That(media.Saves, Is.EqualTo(1));
        Assert.That(media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias], Is.EqualTo("a camera photo"));
        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("770"));
    }

    [Test]
    public async Task Reanalysis_with_the_same_result_does_not_save()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var service = Create(media, chat, configure: s => s.PersistImageDescription = true);
        await service.AnalyzeAsync(Guid.NewGuid());
        var saves = media.Saves;

        await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        Assert.That(saves, Is.EqualTo(1));
        Assert.That(media.Saves, Is.EqualTo(1));
    }

    [Test]
    public async Task Resizes_to_the_image_size_setting()
    {
        var media = new FakeMediaOps { Name = "wide.png", FileBytes = CreatePng(2000, 1000) };
        var chat = new FakeChatService();
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { RecognitionImageSize = 512 } };
        var service = Create(media, chat, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        var sent = chat.ReceivedMessages.SelectMany(m => m.Contents).OfType<DataContent>().Single();
        using var image = Image.Load(sent.Data.ToArray());
        Assert.That(image.Width, Is.EqualTo(512));
    }

    [Test]
    public async Task Description_and_decisions_use_their_own_profile_and_reasoning_effort()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
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

        Assert.That(result!.ClassificationCode, Is.EqualTo("385"));
        Assert.That(chat.Requests, Is.EqualTo([("vision-profile", ReasoningEffort.Low), ("decision-profile", ReasoningEffort.None)]));
        // Reasoning only reaches the model through a client from CreateChatClientAsync (Umbraco.AI drops it otherwise).
        Assert.That(chat.ClientCalls, Is.EqualTo(2));
    }

    [Test]
    public async Task Decisions_use_the_description_profile_when_they_have_none()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"910"}""");
        var settings = new FakeSettingsService
        {
            Value = new MediaCuratorSiteSettings
            {
                DescriptionProfileAlias = "vision-profile",
                DescriptionReasoningEffort = AiReasoningEffort.Default,
                DecisionReasoningEffort = AiReasoningEffort.Default,
            },
        };
        var service = Create(media, chat, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.That(chat.Requests, Is.EqualTo([("vision-profile", (ReasoningEffort?)null), ("vision-profile", (ReasoningEffort?)null)]));
    }

    [Test]
    public async Task Without_a_profile_Umbraco_AIs_default_chat_profile_is_used()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DescriptionReasoningEffort = AiReasoningEffort.Default } };
        var service = Create(media, chat, settings: settings);

        await service.AnalyzeAsync(Guid.NewGuid(), force: true);

        Assert.That(chat.Requests.Single(), Is.EqualTo(((string?)null, (ReasoningEffort?)null)));
    }

    [Test]
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

        Assert.That(first, Is.Not.Null);
        Assert.That(second, Is.Not.Null);
        // Rejected once, retried without; the next analysis no longer asks for it.
        Assert.That(chat.Requests.Select(r => r.Effort).ToArray(), Is.EqualTo(new ReasoningEffort?[] { ReasoningEffort.Low, null, null }));
    }

    [Test]
    public async Task Jev_makes_the_decisions_when_selected()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        var jev = new FakeJev { Picks = new Queue<string?>(["385"]) };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DecisionEngine = DecisionEngine.Jev } };
        var service = Create(media, chat, settings: settings, jev: jev);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("385"));
        Assert.That(chat.Calls, Is.EqualTo(1)); // only the image description went to Umbraco.AI
        var choice = TestAssert.Single(jev.Choices);
        Assert.That(choice.Description, Is.EqualTo("a high-speed train at a station"));
        Assert.That(choice.Parent, Is.Null);
        Assert.That(choice.Candidates.Any(c => c.Code == "385"), Is.True);
        Assert.That(choice.Label(choice.Candidates.Single(c => c.Code == "385")), Is.EqualTo("385 Railroad Transportation (Sociology › Commerce and Communication)"));
    }

    [Test]
    public async Task A_failed_Jev_decision_falls_back_to_Umbraco_AI()
    {
        var media = new FakeMediaOps();
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue(DescribeResponse);
        chat.ResponseQueue.Enqueue("""{"classificationCode":"910"}""");
        var jev = new FakeJev { Picks = new Queue<string?>([null]) };
        var settings = new FakeSettingsService { Value = new MediaCuratorSiteSettings { DecisionEngine = DecisionEngine.Jev } };
        var service = Create(media, chat, settings: settings, jev: jev);

        var result = await service.AnalyzeAsync(Guid.NewGuid(), force: true, classificationSchemeAlias: "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("910"));
        Assert.That(chat.Calls, Is.EqualTo(2));
    }

    // --- Refreshing stored classifications (Curate re-decides outdated AI codes, never re-sends images) ---

    private static void StoreAiResult(FakeMediaOps media, string code, string? method, string file = "/media/a/photo.jpg")
    {
        media.Properties["umbracoFile"] = $$"""{"src":"{{file}}","crops":[]}""";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "three friends taking a selfie at an airport";
        media.Properties[ClassificationProvider.CodePropertyAlias] = code;
        var cached = new RecognitionResult([new AiTag("selfie", 0.9)], "three friends taking a selfie at an airport", code, media.UpdateDate, method, file);
        media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias] = System.Text.Json.JsonSerializer.Serialize(cached);
    }

    [Test]
    public async Task Refresh_re_decides_an_outdated_ai_code_from_the_saved_description()
    {
        var media = new FakeMediaOps();
        StoreAiResult(media, "390", method: null);
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"910"}""");
        var service = Create(media, chat);

        var result = await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("910"));
        Assert.That(result.ClassificationMethod, Is.EqualTo("dewey-pd:one-step-v1"));
        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("910"));
        Assert.That(chat.Calls, Is.EqualTo(1));
        Assert.That(chat.ReceivedMessages.SelectMany(m => m.Contents).OfType<DataContent>(), Is.Empty); // no image sent
        Assert.That(media.Properties[UmbracoAiRecognitionService.TagsPropertyAlias], Does.Contain("dewey-pd:one-step-v1"));
    }

    [Test]
    public async Task Refresh_leaves_codes_decided_the_current_way()
    {
        var media = new FakeMediaOps();
        StoreAiResult(media, "390", method: "dewey-pd:one-step-v1");
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var result = await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");

        Assert.That(result!.ClassificationCode, Is.EqualTo("390"));
        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task Refresh_never_changes_a_code_an_editor_entered()
    {
        var media = new FakeMediaOps();
        StoreAiResult(media, "390", method: null);
        media.Properties[ClassificationProvider.CodePropertyAlias] = "920"; // edited after the AI chose 390
        var chat = new FakeChatService();
        var service = Create(media, chat);

        await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");

        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("920"));
        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task Refresh_does_nothing_without_a_saved_description()
    {
        var media = new FakeMediaOps();
        media.Properties[ClassificationProvider.CodePropertyAlias] = "390";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        Assert.That(await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd"), Is.Null);
        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task Codes_from_before_the_cache_are_re_decided_once_when_the_cache_can_be_saved()
    {
        var media = new FakeMediaOps();
        media.Properties[ClassificationProvider.CodePropertyAlias] = "390";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "two men smiling for a selfie in a crowded nightclub";
        var chat = new FakeChatService();
        chat.ResponseQueue.Enqueue("""{"classificationCode":"790"}""");
        var service = Create(media, chat);

        await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");
        await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");

        Assert.That(media.Properties[ClassificationProvider.CodePropertyAlias], Is.EqualTo("790"));
        Assert.That(chat.Calls, Is.EqualTo(1)); // the second run finds it current
    }

    [Test]
    public async Task Without_the_cache_property_refresh_never_calls_the_ai()
    {
        var media = new FakeMediaOps { ThrowOnSet = true };
        media.Properties[ClassificationProvider.CodePropertyAlias] = "390";
        media.Properties[UmbracoAiRecognitionService.DescriptionPropertyAlias] = "people at a pub";
        var chat = new FakeChatService();
        var service = Create(media, chat);

        await service.RefreshClassificationAsync(Guid.NewGuid(), "dewey-pd");

        Assert.That(chat.Calls, Is.EqualTo(0));
    }

    // Regression: saving the cache (or a move) bumps the item's update date, which made every cache stale.
    [Test]
    public async Task Cache_stays_fresh_when_the_item_is_saved_and_goes_stale_when_the_file_changes()
    {
        var media = new FakeMediaOps();
        StoreAiResult(media, "910", method: "dewey-pd:one-step-v1");
        media.UpdateDate = media.UpdateDate.AddHours(1);
        var chat = new FakeChatService();
        var service = Create(media, chat);

        var cached = await service.AnalyzeAsync(Guid.NewGuid(), classificationSchemeAlias: "dewey-pd");
        Assert.That(cached!.ClassificationCode, Is.EqualTo("910"));
        Assert.That(chat.Calls, Is.EqualTo(0));

        media.Properties["umbracoFile"] = """{"src":"/media/b/replaced.jpg"}""";
        await service.AnalyzeAsync(Guid.NewGuid());
        Assert.That(chat.Calls > 0, Is.True); // a new file is analysed again
    }
}

