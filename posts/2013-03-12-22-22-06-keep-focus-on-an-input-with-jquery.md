---title: Keep focus on an input with jQueryslug: keep-focus-on-an-input-with-jquerydate: 2013-03-12 22:22tags:  - jquery - javascript---The most hair-loss-inducing problems usually have the simplest solutions, and such can be said for my latest shortcut to male pattern baldness.

I'm working on my forever project, and part of it requires that an input keep focus *all of the time*. User experience out of the window, this is the way it has to be, but `.blur()` is not cancel-able, nor is `.focusout()`. This means you can't just call `.focus()` in the `.blur()` function. You have to trick it.

Set initial focus first:

    $("#input").focus();

And then set the `re-focus`:

    $("#input").blur(function() {
        setTimeout(function() { $("#input").focus(); }, 0);
    });

Works a treat.