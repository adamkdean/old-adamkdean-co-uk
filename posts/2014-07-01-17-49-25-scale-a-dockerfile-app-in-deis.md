---title: Scale a Dockerfile app in Deisslug: scale-a-dockerfile-app-in-deisdate: 2014-07-01 17:49tags:  - deis - procfile - dockerfile---Deis allows you to run apps in two different ways: using a Procfile, and using a Dockerfile. When using a Procfile, you define what type of processes you'll be running, such as:

    web: node index.js

To scale this, say to 2 instances, it's as simple as:

    $ deis ps:scale web=2

This doesn't work when using the Dockerfile approach however. For that, we can see from ps:list that the instance type is actually cmd.

    $ deis ps:list
    --- cmd:
    cmd.1 up (v2)

If we were using a Procfile, this would say web.1 up (v2) etc. So to scale the Dockerfile, we need to use cmd rather than web.

    $ deis ps:scale cmd=2

And then, once it's got coffee, it'll scale your apps.