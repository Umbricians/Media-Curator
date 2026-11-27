// A new instance of a test class for every test, as the tests were written for (xUnit's behaviour): their fields are
// set up afresh for each test.
[assembly: FixtureLifeCycle(LifeCycle.InstancePerTestCase)]
