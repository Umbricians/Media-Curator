using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class ClassificationCodeValidatorTests
{
    [Fact]
    public void Validate_accepts_known_scheme_code()
    {
        var scheme = new DeweyPublicDomainScheme();

        Assert.Equal("770", ClassificationCodeValidator.Validate(scheme, "770"));
    }

    [Fact]
    public void Validate_rejects_unknown_code()
    {
        var scheme = new DeweyPublicDomainScheme();

        Assert.Null(ClassificationCodeValidator.Validate(scheme, "XYZ999"));
    }
}
