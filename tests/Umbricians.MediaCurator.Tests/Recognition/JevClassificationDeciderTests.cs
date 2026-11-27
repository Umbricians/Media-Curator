using System.Net;
using System.Text;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging.Abstractions;
using Umbricians.MediaCurator.Settings;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class JevClassificationDeciderTests
{
    private sealed class FakeHandler : HttpMessageHandler
    {
        public Queue<HttpResponseMessage> Responses = new();
        public List<(HttpRequestMessage Request, string Body)> Requests = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Requests.Add((request, await request.Content!.ReadAsStringAsync(cancellationToken)));
            return Responses.Dequeue();
        }
    }

    private sealed class Factory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, disposeHandler: false);
    }

    private sealed class KeySettings(string? apiKey, string model = "jev-latest") : IMediaCuratorSettingsService
    {
        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(new MediaCuratorSiteSettings { JevModel = model, JevApiKeyConfigured = apiKey is not null });

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default) => Task.CompletedTask;

        public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult(apiKey);

        public Task SetTypeSafeApiKeyAsync(string? key, CancellationToken cancellationToken = default) => Task.CompletedTask;
    }

    private static HttpResponseMessage Answer(string choice) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(
            "{\"model\":\"jev-1.13.0\",\"answers\":{\"classification\":{\"type\":\"choice\",\"choice\":\"" + choice
                + "\",\"confidence\":0.82,\"probabilities\":{}}}}",
            Encoding.UTF8,
            "application/json"),
    };

    private static (JevClassificationDecider Decider, FakeHandler Handler, List<TimeSpan> Delays) Create(string? apiKey = "test-key")
    {
        var handler = new FakeHandler();
        var delays = new List<TimeSpan>();
        var decider = new JevClassificationDecider(
            new Factory(handler),
            new KeySettings(string.IsNullOrWhiteSpace(apiKey) ? null : apiKey),
            NullLogger<JevClassificationDecider>.Instance,
            (delay, _) =>
            {
                delays.Add(delay);
                return Task.CompletedTask;
            });
        return (decider, handler, delays);
    }

    private static ClassificationChoice TopLevel()
    {
        var scheme = new DeweyPublicDomainScheme();
        return new ClassificationChoice(scheme, "a church with a bell tower", [new AiTag("church", 0.9)], null, scheme.GetChildren(null));
    }

    [Test]
    public async Task Asks_one_choice_question_with_every_candidate_and_returns_the_pick()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(Answer("200"));

        var code = await decider.ChooseAsync(TopLevel());

        Assert.That(code, Is.EqualTo("200"));
        var (request, body) = TestAssert.Single(handler.Requests);
        Assert.That(request.RequestUri!.ToString(), Is.EqualTo("https://api.typesafe.ai/v1/systemone"));
        Assert.That(request.Headers.Authorization!.ToString(), Is.EqualTo("Bearer test-key"));

        var json = JsonNode.Parse(body)!;
        Assert.That((string?)json["model"], Is.EqualTo("jev-latest"));
        Assert.That((string?)json["state"]!["image_summary"], Is.EqualTo("a church with a bell tower"));
        Assert.That(json["state"]!["already_classified_under"], Is.Null);
        var question = json["questions"]!["classification"]!;
        Assert.That((string?)question["type"], Is.EqualTo("choice"));
        Assert.That((string?)question["instructions"], Does.Contain("DEPICTS, not the medium"));
        Assert.That((string?)question["criteria"]!["200"], Is.EqualTo("200 Religion"));
        Assert.That(question["criteria"]!.AsObject().Count, Is.EqualTo(10));
    }

    [Test]
    public async Task Lower_levels_carry_the_parent_classification()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(Answer("280"));
        var scheme = new DeweyPublicDomainScheme();
        var parent = scheme.GetChildren(null).Single(c => c.Code == "200");

        var code = await decider.ChooseAsync(new ClassificationChoice(scheme, "a church", [], parent, scheme.GetChildren("200")));

        Assert.That(code, Is.EqualTo("280"));
        var json = JsonNode.Parse(handler.Requests[0].Body)!;
        Assert.That((string?)json["state"]!["already_classified_under"], Is.EqualTo("200 Religion"));
        Assert.That((string?)json["questions"]!["classification"]!["instructions"], Does.Contain("within `already_classified_under`"));
    }

    [Test]
    public async Task Retries_when_rate_limited_or_overloaded()
    {
        var (decider, handler, delays) = Create();
        handler.Responses.Enqueue(new HttpResponseMessage(HttpStatusCode.TooManyRequests));
        handler.Responses.Enqueue(new HttpResponseMessage((HttpStatusCode)529));
        handler.Responses.Enqueue(Answer("700"));

        var code = await decider.ChooseAsync(TopLevel());

        Assert.That(code, Is.EqualTo("700"));
        Assert.That(delays, Is.EqualTo([TimeSpan.FromSeconds(2), TimeSpan.FromSeconds(4)]));
    }

    [Test]
    public async Task Returns_null_on_failure_so_the_caller_can_fall_back()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(new HttpResponseMessage(HttpStatusCode.Unauthorized));

        Assert.That(await decider.ChooseAsync(TopLevel()), Is.Null);
        Assert.That(handler.Requests, Has.Exactly(1).Items);
    }

    [Test]
    public async Task Makes_no_call_without_an_api_key()
    {
        var (decider, handler, _) = Create(apiKey: " ");

        Assert.That(await decider.ChooseAsync(TopLevel()), Is.Null);
        Assert.That(handler.Requests, Is.Empty);
    }

    [Test]
    public async Task One_step_choices_label_each_option_with_its_classes()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(Answer("910"));
        var scheme = new DeweyPublicDomainScheme();
        var finals = HierarchicalClassificationResolver.FinalEntries(scheme, 4);
        var notes = finals.ToDictionary(f => f.Code, f => string.Join(" › ", scheme.GetPath(f.Code).SkipLast(1).Select(e => e.Name)));

        await decider.ChooseAsync(new ClassificationChoice(scheme, "a selfie at an airport", [], null, finals, notes));

        var criteria = JsonNode.Parse(handler.Requests[0].Body)!["questions"]!["classification"]!["criteria"]!.AsObject();
        Assert.That(criteria.Count, Is.EqualTo(finals.Count));
        Assert.That((string?)criteria["910"], Is.EqualTo("910 Geography and Travels (History)"));
    }
}

