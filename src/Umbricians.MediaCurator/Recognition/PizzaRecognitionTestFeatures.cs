using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using Umbraco.AI.Core.Chat;
using Umbraco.AI.Core.EditableModels;
using Umbraco.AI.Core.Tests;
using Umbraco.Cms.Core.Composing;

namespace Umbricians.MediaCurator.Recognition;

internal abstract class PizzaRecognitionTestFeature : IAITestFeature, IDiscoverable
{
    private const string TestImagePath = "tests/images/test-pizza.jpg";

    private readonly IAIChatService _chatService;
    private readonly IWebHostEnvironment _environment;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;

    protected PizzaRecognitionTestFeature(
        IAIChatService chatService,
        IWebHostEnvironment environment,
        IOptionsMonitor<MediaCuratorOptions> options)
    {
        _chatService = chatService;
        _environment = environment;
        _options = options;
    }

    public abstract string Id { get; }
    public abstract string Name { get; }
    public abstract string Description { get; }
    public string Category => "MediaCurator";
    public Type? ConfigType => null;

    protected abstract string Variant { get; }

    public AIEditableModelSchema? GetConfigSchema() => null;

    public string ExtractOutputValue(AITestTranscript transcript)
    {
        if (transcript.FinalOutput is JsonElement output &&
            output.TryGetProperty("content", out var content))
        {
            return content.GetString() ?? string.Empty;
        }

        return string.Empty;
    }

    public async Task<AITestTranscript> ExecuteAsync(
        AITest test,
        int runNumber,
        Guid? profileIdOverride,
        IEnumerable<Guid>? contextIdsOverride,
        IEnumerable<Guid>? guardrailIdsOverride,
        CancellationToken cancellationToken)
    {
        var stopwatch = Stopwatch.StartNew();
        var (imageBytes, mediaType) = await LoadImageAsync(cancellationToken);
        var prompt = ClassificationPromptBuilder.BuildDescribePrompt();
        var messages = new[]
        {
            new ChatMessage(ChatRole.User,
            [
                new TextContent(prompt),
                new DataContent(imageBytes, mediaType),
            ]),
        };

        var profileId = profileIdOverride ?? test.ProfileId;
        var response = await _chatService.GetChatResponseAsync(
            chat =>
            {
                chat.WithAlias(Id);
                if (profileId is not null)
                {
                    chat.WithProfile(profileId.Value);
                }
            },
            messages,
            cancellationToken);
        stopwatch.Stop();

        var (width, height) = ReadDimensions(imageBytes);
        var finalOutput = JsonSerializer.SerializeToElement(new
        {
            content = response.Text,
            variant = Variant,
            mediaType,
            width,
            height,
            byteLength = imageBytes.Length,
        });

        return new AITestTranscript
        {
            RunId = Guid.NewGuid(),
            Messages = JsonSerializer.SerializeToElement(new[]
            {
                new { role = "user", content = $"{prompt}\n\n[{Variant} pizza image: {mediaType}, {width}x{height}, {imageBytes.Length} bytes]" },
                new { role = "assistant", content = response.Text },
            }),
            Timing = JsonSerializer.SerializeToElement(new
            {
                totalMs = stopwatch.ElapsedMilliseconds,
                steps = new[] { new { name = "vision", durationMs = stopwatch.ElapsedMilliseconds } },
            }),
            FinalOutput = finalOutput,
        };
    }

    protected virtual Task<(byte[] Bytes, string MediaType)> LoadImageAsync(CancellationToken cancellationToken)
        => Task.FromResult((File.ReadAllBytes(ResolveTestImagePath()), "image/jpeg"));

    protected string ResolveTestImagePath()
    {
        var directory = new DirectoryInfo(_environment.ContentRootPath);
        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, TestImagePath);
            if (File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException($"Could not find '{TestImagePath}'.");
    }

    protected int MaxEdgePixels => _options.CurrentValue.MaxRecognitionEdgePixels;

    protected string? PreparedImageTestFolder => RecognitionImagePreparer.ResolveTestOutputFolder(
        _options.CurrentValue.RecognitionPreparedImageTestFolder,
        _environment.ContentRootPath);

    private static (int Width, int Height) ReadDimensions(byte[] imageBytes)
    {
        var info = Image.Identify(imageBytes);
        return info is null ? (0, 0) : (info.Width, info.Height);
    }
}

[AITestFeature("media-curator-pizza-original", "MediaCurator pizza original")]
internal sealed class PizzaOriginalRecognitionTestFeature : PizzaRecognitionTestFeature
{
    public PizzaOriginalRecognitionTestFeature(
        IAIChatService chatService,
        IWebHostEnvironment environment,
        IOptionsMonitor<MediaCuratorOptions> options)
        : base(chatService, environment, options)
    {
    }

    public override string Id => "media-curator-pizza-original";
    public override string Name => "MediaCurator pizza original";
    public override string Description => "Tests the original bundled pizza image against a vision-capable chat profile.";
    protected override string Variant => "original";
}

[AITestFeature("media-curator-pizza-prepared", "MediaCurator pizza prepared")]
internal sealed class PizzaPreparedRecognitionTestFeature : PizzaRecognitionTestFeature
{
    public PizzaPreparedRecognitionTestFeature(
        IAIChatService chatService,
        IWebHostEnvironment environment,
        IOptionsMonitor<MediaCuratorOptions> options)
        : base(chatService, environment, options)
    {
    }

    public override string Id => "media-curator-pizza-prepared";
    public override string Name => "MediaCurator pizza prepared";
    public override string Description => "Tests the bundled pizza image after MediaCurator resize preparation.";
    protected override string Variant => "prepared";

    protected override Task<(byte[] Bytes, string MediaType)> LoadImageAsync(CancellationToken cancellationToken)
    {
        var original = File.ReadAllBytes(ResolveTestImagePath());
        var prepared = RecognitionImagePreparer.Prepare(
            original,
            "image/jpeg",
            MaxEdgePixels,
            PreparedImageTestFolder,
            "test-pizza-ai-feature");
        return Task.FromResult(prepared);
    }
}
