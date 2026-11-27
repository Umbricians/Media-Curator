namespace Umbricians.MediaCurator.Tests;

/// <summary>NUnit asserts that also return what they checked, for a test to go on using.</summary>
internal static class TestAssert
{
    /// <summary>Asserts there is exactly one item, and returns it.</summary>
    public static T Single<T>(IEnumerable<T> items)
    {
        var list = items.ToList();
        Assert.That(list, Has.Count.EqualTo(1));
        return list[0];
    }

    /// <summary>Asserts exactly one item matches, and returns it.</summary>
    public static T Single<T>(IEnumerable<T> items, Func<T, bool> match) => Single(items.Where(match));

    /// <summary>Asserts the value is exactly a <typeparamref name="T"/>, not a subclass, and returns it as one.</summary>
    public static T IsType<T>(object? value)
    {
        Assert.That(value, Is.TypeOf<T>());
        return (T)value!;
    }
}
