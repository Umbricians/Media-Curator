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

    // The prompt lists choices as "CODE|Name", and models sometimes answer with the whole line.
    [TestCase("770|Photography", "770")]
    [TestCase(" 770 | Photography ", "770")]
    [TestCase("770|Photography (Fine Arts)", "770")]
    public void Validate_takes_the_code_from_an_answer_that_repeats_the_choice(string answer, string expected)
    {
        Assert.That(ClassificationCodeValidator.Validate(new DeweyPublicDomainScheme(), answer), Is.EqualTo(expected));
    }

    [TestCase("XYZ999|Photography")]
    [TestCase("|770")]
    [TestCase("Photography")]
    public void Validate_still_rejects_an_answer_without_a_known_code_first(string answer)
    {
        Assert.That(ClassificationCodeValidator.Validate(new DeweyPublicDomainScheme(), answer), Is.Null);
    }
}
