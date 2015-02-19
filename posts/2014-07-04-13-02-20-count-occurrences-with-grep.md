---title: Count occurrences with grepslug: count-occurrences-with-grepdate: 2014-07-04 13:02tags:  - grep - bash---Today I learnt that grep has a '-c' switch that counts occurrences. I'll never pipe it to 'wc -l' again!

    $ ps aux | grep -c adam
    93

But if we use wc, we would also need to trim it:

    $ ps aux | grep adam | wc -l
            94

So, use -c.