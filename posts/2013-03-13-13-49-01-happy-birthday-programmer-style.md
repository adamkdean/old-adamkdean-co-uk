---title: Happy Birthday - programmer style.slug: happy-birthday-programmer-styledate: 2013-03-13 13:49tags: - random - c---Today I decided to wish my good friend [@Farkie](https://twitter.com/Farkie) happy birthday: programmer style.

Here's to you, ol' bean.

    using System;
    using System.Text;

    public class HappyBirthday
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("{0} {1}{2} {3}",
                GetRandomString(-1045111850),
                GetRandomString(554696058),
                GetRandomString(99640),
                GetRandomString(-2146856402));

            Console.ReadKey();
        }

        public static string GetRandomString(int seed)
        {
            var rnd = new Random(seed);
            var sb = new StringBuilder();
            for (; ; )
            {
                int c = rnd.Next(0, 27);
                if (c == 0) break;
                sb.Append((char)(96 + c));
            }
            return sb.ToString();
        }
    }

And, because you probably won't be bothered to compile it, I've done that for you too.

![Happy Birthday Alan](http://i.imgur.com/wg2sI1q.png)
