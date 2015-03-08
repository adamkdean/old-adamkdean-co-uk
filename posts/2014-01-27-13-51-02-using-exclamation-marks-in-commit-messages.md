---

    git commit -m "I did some most excellent work!"
    sh.exe": !": event not found

You have two ways around this. One most excellent way is to use single quotes:

    git commit -m 'I did some most excellent work!'
    [branch 123abc] I did some most excellent work!
    1 file changed, 2 insertions(+)

Another way, if you require double quotes, is to add it onto the end with single quotes:

    git commit -m "I did some most excellent work"'!'
    [branch 123abc] I did some most excellent work!
    1 file changed, 2 insertions(+)

Unfortunately, simply escaping the character will not work, you will just end up with `\!`.