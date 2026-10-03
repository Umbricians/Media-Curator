using System.Net;
using System.Text;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
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

    private sealed class Options(MediaCuratorOptions value) : IOptionsMonitor<MediaCuratorOptions>
    {
        public MediaCuratorOptions CurrentValue => value;
        public MediaCuratorOptions Get(string? name) => value;
        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
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
            new Options(new MediaCuratorOptions { TypeSafe = { ApiKey = apiKey } }),
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

    [Fact]
    public async Task Asks_one_choice_question_with_every_candidate_and_returns_the_pick()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(Answer("200"));

        var code = await decider.ChooseAsync(TopLevel());

        Assert.Equal("200", code);
        var (request, body) = Assert.Single(handler.Requests);
        Assert.Equal("https://api.typesafe.ai/v1/systemone", request.RequestUri!.ToString());
        Assert.Equal("Bearer test-key", request.Headers.Authorization!.ToString());

        var json = JsonNode.Parse(body)!;
        Assert.Equal("jev-latest", (string?)json["model"]);
        Assert.Equal("a church with a bell tower", (string?)json["state"]!["image_summary"]);
        Assert.Null(json["state"]!["already_classified_under"]);
        var question = json["questions"]!["classification"]!;
        Assert.Equal("choice", (string?)question["type"]);
        Assert.Contains("DEPICTS, not the medium", (string?)question["instructions"]);
        Assert.Equal("200 Religion", (string?)question["criteria"]!["200"]);
        Assert.Equal(10, question["criteria"]!.AsObject().Count);
    }

    [Fact]
    public async Task Lower_levels_carry_the_parent_classification()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(Answer("280"));
        var scheme = new DeweyPublicDomainScheme();
        var parent = scheme.GetChildren(null).Single(c => c.Code == "200");

        var code = await decider.ChooseAsync(new ClassificationChoice(scheme, "a church", [], parent, scheme.GetChildren("200")));

        Assert.Equal("280", code);
        var json = JsonNode.Parse(handler.Requests[0].Body)!;
        Assert.Equal("200 Religion", (string?)json["state"]!["already_classified_under"]);
        Assert.Contains("within `already_classified_under`", (string?)json["questions"]!["classification"]!["instructions"]);
    }

    [Fact]
    public async Task Retries_when_rate_limited_or_overloaded()
    {
        var (decider, handler, delays) = Create();
        handler.Responses.Enqueue(new HttpResponseMessage(HttpStatusCode.TooManyRequests));
        handler.Responses.Enqueue(new HttpResponseMessage((HttpStatusCode)529));
        handler.Responses.Enqueue(Answer("700"));

        var code = await decider.ChooseAsync(TopLevel());

        Assert.Equal("700", code);
        Assert.Equal([TimeSpan.FromSeconds(2), TimeSpan.FromSeconds(4)], delays);
    }

    [Fact]
    public async Task Returns_null_on_failure_so_the_caller_can_fall_back()
    {
        var (decider, handler, _) = Create();
        handler.Responses.Enqueue(new HttpResponseMessage(HttpStatusCode.Unauthorized));

        Assert.Null(await decider.ChooseAsync(TopLevel()));
        Assert.Single(handler.Requests);
    }

    [Fact]
    public async Task Makes_no_call_without_an_api_key()
    {
        var (decider, handler, _) = Create(apiKey: " ");

        Assert.False(decider.IsConfigured);
        Assert.Null(await decider.ChooseAsync(TopLevel()));
        Assert.Empty(handler.Requests);
    }
}
