using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class ClassificationCodeValidatorTests
{
    [Test]
    public void Validate_accepts_known_scheme_code()
    {
        var scheme = new DeweyPublicDomainScheme();

        Assert.That(ClassificationCodeValidator.Validate(scheme, "770"), Is.EqualTo("770"));
    }

    [Test]
    public void Validate_rejects_unknown_code()
    {
        var scheme = new DeweyPublicDomainScheme();

        Assert.That(ClassificationCodeValidator.Validate(scheme, "XYZ999"), Is.Null);
    }
}
