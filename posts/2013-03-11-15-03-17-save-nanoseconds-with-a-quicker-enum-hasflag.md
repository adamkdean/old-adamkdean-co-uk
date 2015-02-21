---title: Save nanoseconds with a quicker Enum.HasFlagslug: save-nanoseconds-with-a-quicker-enum-hasflagdate: 2013-03-11 15:03tags: - csharp - bitwise - enum - performance---One of the easiest ways to manage security flags is to have an Enum and use bitwise comparisons, however you would expect .NET to make things a bit easier for you, afterall who wants to start littering the code with bitwise expressions?

.NET *does* actually make it easier for you, allowing you to check flags with the `Enum.HasFlag` method, but it has type checking and is generally slow. Like running through water slow.

Let's make a enum to begin with:

    [Flags]
    public enum UserFlag
    {
        User = 1,
        Moderator = 2,
        Administrator = 4,
        Developer = 8
    }

We can now give a hypothetical `User` some flags. We could make them just a `User`, or a `User` and a `Moderator`. We could make them all four. Let's just make them a user with moderation rights, a pretty popular choice.

    UserFlag flags = UserFlag.User | UserFlag.Moderator;

If we were to have a section that only allowed moderators in, we could perform a check with bitwise:

    if ((flags & UserFlag.Moderator) == UserFlag.Moderator)
    {
        ...
    }

Easy, but maybe confusing to a newbie reading the code. An easier way would be to use `HasFlag`:

    if (flags.HasFlag(UserFlag.Moderator))
    {
        ...
    }

Running through water, fully dressed whilst carrying a basket of bread. The reason that `HasFlag` is so slow is because of type checking, we really don't need that in place, we know the type, we just want the check made. An easier way would be to have an extension method:

    public static class UserFlagExtensions
    {
        public static bool HasFlagQuick(this UserFlag haystack, UserFlag needle)
        {
            return (haystack & needle) == needle;
        }
    }

How much quicker is this you may ask? I ran the check ten million times each, and the results are pretty visible. Removing the needless type checking gives us a method that is *15 times quicker*, saving us 32.8 nanoseconds per call.

    Method         Count        Elapsed Total   Elapsed Each
    HasFlag        10,000,000   0.390 s         39.0 nano seconds
    HasFlagQuick   10,000,000   0.062 s          6.2 nano seconds
