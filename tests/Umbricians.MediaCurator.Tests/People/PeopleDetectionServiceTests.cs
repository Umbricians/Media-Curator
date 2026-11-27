using System.Net;
using System.Text;
using System.Text.Json.Nodes;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Umbraco.AI.Core.Chat;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.People;

public class PeopleDetectionServiceTests
{
    /// <summary>Answers every inline chat call with <see cref="Response"/>; other members are unused here.</summary>
    private sealed class FakeChat : IAIChatService
    {
        public string Response = """{"containsPeople": true, "confidence": 0.8}""";
        public List<string> Prompts = [];

        public Task<ChatResponse> GetChatResponseAsync(
            Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure,
            IEnumerable<ChatMessage> messages,
            CancellationToken cancellationToken = default)
        {
            Prompts.AddRange(messages.Select(m => m.Text));
            return Task.FromResult(new ChatResponse(new ChatMessage(ChatRole.Assistant, Response)));
        }

        public Task<ChatResponse> GetChatResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public Task<ChatResponse> GetChatResponseAsync(Guid profileId, IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public IAsyncEnumerable<ChatResponseUpdate> GetStreamingChatResponseAsync(IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public IAsyncEnumerable<ChatResponseUpdate> GetStreamingChatResponseAsync(Guid profileId, IEnumerable<ChatMessage> messages, ChatOptions? options = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public IAsyncEnumerable<ChatResponseUpdate> StreamChatResponseAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, IEnumerable<ChatMessage> messages, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public Task<IChatClient> CreateChatClientAsync(Action<Umbraco.AI.Core.InlineChat.AIChatBuilder> configure, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();

        public Task<IChatClient> GetChatClientAsync(Guid? profileId = null, CancellationToken cancellationToken = default)
            => throw new NotSupportedException();
    }

    private sealed class FakeJev(double? probability) : IJevPeopleDecider
    {
        public int Calls;

        public Task<double?> ProbabilityAsync(string description, IReadOnlyList<AiTag> tags, CancellationToken cancellationToken = default)
        {
            Calls++;
            return Task.FromResult(probability);
        }
    }

    private sealed class FakeMediaInfo(string path = "-1,100,102", string? sourceFile = "/media/a.jpg") : IPeopleMediaInfo
    {
        public (string Path, string? SourceFile)? Get(Guid mediaKey) => (path, sourceFile);
    }

    private static readonly Guid Key = Guid.NewGuid();

    private static (PeopleDetectionService Service, FakePeopleRepository Repository, FakeChat Chat) Create(
        FakeJev? jev = null,
        DecisionEngine engine = DecisionEngine.Jev,
        bool aiEnabled = true,
        FakeMediaInfo? media = null)
    {
        var repository = new FakePeopleRepository();
        var chat = new FakeChat();
        var services = new ServiceCollection().AddSingleton<IAIChatService>(chat).BuildServiceProvider();
        var settings = new FakePeopleSettings(new MediaCuratorSiteSettings { DecisionEngine = engine, AiEnabled = aiEnabled });
        var service = new PeopleDetectionService(
            repository,
            media ?? new FakeMediaInfo(),
            settings,
            services.GetRequiredService<IServiceScopeFactory>(),
            NullLogger<PeopleDetectionService>.Instance,
            jev,
            TimeProvider.System);
        return (service, repository, chat);
    }

    private static readonly AiTag[] Tags = [new("street", 0.9), new("crowd", 0.8)];

    [TestCase(0.93, true, 0.93)]
    [TestCase(0.5, true, 0.5)]
    [TestCase(0.2, false, 0.8)]
    public async Task Jev_probability_is_thresholded_and_stored_with_the_confidence_of_the_answer(
        double probability, bool containsPeople, double confidence)
    {
        var (service, repository, chat) = Create(new FakeJev(probability));

        var result = await service.DetectAsync(Key, "A busy street", Tags);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ContainsPeople, Is.EqualTo(containsPeople));
        Assert.That(result.Confidence, Is.EqualTo(confidence).Within(0.00005));
        Assert.That(result.Source, Is.EqualTo(PeopleDetectionSources.Jev));
        Assert.That(repository.Rows[Key].Path, Is.EqualTo("-1,100,102"));
        Assert.That(repository.Rows[Key].SourceFile, Is.EqualTo("/media/a.jpg"));
        Assert.That(chat.Prompts, Is.Empty);
    }

    [Test]
    public async Task Without_a_Jev_decision_it_falls_back_to_Umbraco_AI()
    {
        var (service, repository, chat) = Create(new FakeJev(null));

        var result = await service.DetectAsync(Key, "A busy street", Tags);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ContainsPeople, Is.True);
        Assert.That(result.Confidence, Is.EqualTo(0.8));
        Assert.That(result.Source, Is.EqualTo(PeopleDetectionSources.UmbracoAi));
        Assert.That(TestAssert.Single(chat.Prompts), Does.Contain("A busy street"));
        Assert.That(repository.Rows.ContainsKey(Key), Is.True);
    }

    [Test]
    public async Task Umbraco_AI_is_used_when_it_is_the_decision_engine()
    {
        var jev = new FakeJev(0.9);
        var (service, _, chat) = Create(jev, DecisionEngine.UmbracoAi);
        chat.Response = "```json\n{\"containsPeople\": false, \"confidence\": 0.95}\n```";

        var result = await service.DetectAsync(Key, "A bowl of fruit", Tags);

        Assert.That(result!.ContainsPeople, Is.False);
        Assert.That(jev.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task A_current_stored_decision_is_reused_without_asking_again()
    {
        var jev = new FakeJev(0.1);
        var (service, repository, _) = Create(jev);
        repository.Add(Key, "-1,100,102", containsPeople: true, sourceFile: "/media/a.jpg");

        var result = await service.DetectAsync(Key, "A busy street", Tags);

        Assert.That(result!.ContainsPeople, Is.True);
        Assert.That(jev.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task A_decision_for_a_replaced_file_is_made_again()
    {
        var jev = new FakeJev(0.1);
        var (service, repository, _) = Create(jev);
        repository.Add(Key, "-1,100,102", containsPeople: true, sourceFile: "/media/old.jpg");

        var result = await service.DetectAsync(Key, "A bowl of fruit", Tags);

        Assert.That(result!.ContainsPeople, Is.False);
        Assert.That(jev.Calls, Is.EqualTo(1));
    }

    [Test]
    public async Task Nothing_is_decided_without_a_description_or_with_AI_off()
    {
        var jev = new FakeJev(0.9);
        var (service, _, _) = Create(jev);
        var (off, _, _) = Create(jev, aiEnabled: false);

        Assert.That(await service.DetectAsync(Key, " ", Tags), Is.Null);
        Assert.That(await off.DetectAsync(Key, "A busy street", Tags), Is.Null);
        Assert.That(jev.Calls, Is.EqualTo(0));
    }

    [Test]
    public async Task An_unreadable_answer_stores_nothing()
    {
        var (service, repository, chat) = Create(engine: DecisionEngine.UmbracoAi);
        chat.Response = "I think so";

        Assert.That(await service.DetectAsync(Key, "A busy street", Tags), Is.Null);
        Assert.That(repository.Rows, Is.Empty);
    }

    [TestCase("""{"containsPeople": true, "confidence": 0.7}""", true, 0.7)]
    [TestCase("""Here: {"ContainsPeople": "false"}""", false, 0.75)]
    [TestCase("""{"containsPeople": true, "confidence": 7}""", true, 0.75)]
    public void Umbraco_AI_answers_are_parsed_leniently(string text, bool containsPeople, double confidence)
    {
        var parsed = PeopleDetectionService.ParseUmbracoAiAnswer(text);

        Assert.That(parsed, Is.EqualTo((containsPeople, confidence)));
    }

    [Test]
    public void Jev_request_is_one_noul_question_over_the_summary_and_tags()
    {
        var json = JsonNode.Parse(System.Text.Json.JsonSerializer.Serialize(
            JevPeopleDecider.BuildRequest("A busy street", Tags, "jev-latest")))!;

        Assert.That((string?)json["model"], Is.EqualTo("jev-latest"));
        Assert.That((string?)json["state"]!["image_summary"], Is.EqualTo("A busy street"));
        Assert.That((string?)json["state"]!["tags"]![1], Is.EqualTo("crowd"));
        var question = json["questions"]![JevPeopleDecider.QuestionId]!;
        Assert.That((string?)question["type"], Is.EqualTo("noul"));
        Assert.That(question["criteria"]!["true"], Is.Not.Null);
        Assert.That(question["criteria"]!["false"], Is.Not.Null);
    }

    [Test]
    public async Task Jev_decider_reads_the_noul_probability()
    {
        var handler = new StubHandler(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(
                """{"model":"jev-1.13.0","answers":{"contains_people":{"type":"noul","noul":0.97}}}""",
                Encoding.UTF8,
                "application/json"),
        });
        var decider = new JevPeopleDecider(
            new StubFactory(handler),
            new FakePeopleSettings(new MediaCuratorSiteSettings(), apiKey: "key"),
            NullLogger<JevPeopleDecider>.Instance,
            (_, _) => Task.CompletedTask);

        Assert.That(await decider.ProbabilityAsync("A busy street", Tags), Is.EqualTo(0.97));
        Assert.That(handler.Request!.Headers.Authorization!.Scheme, Is.EqualTo("Bearer"));
    }

    [Test]
    public async Task Jev_decider_returns_nothing_without_an_API_key()
    {
        var handler = new StubHandler(new HttpResponseMessage(HttpStatusCode.OK));
        var decider = new JevPeopleDecider(
            new StubFactory(handler),
            new FakePeopleSettings(new MediaCuratorSiteSettings()),
            NullLogger<JevPeopleDecider>.Instance);

        Assert.That(await decider.ProbabilityAsync("A busy street", Tags), Is.Null);
        Assert.That(handler.Request, Is.Null);
    }

    private sealed class StubHandler(HttpResponseMessage response) : HttpMessageHandler
    {
        public HttpRequestMessage? Request;

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Request = request;
            return Task.FromResult(response);
        }
    }

    private sealed class StubFactory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, disposeHandler: false);
    }
}
