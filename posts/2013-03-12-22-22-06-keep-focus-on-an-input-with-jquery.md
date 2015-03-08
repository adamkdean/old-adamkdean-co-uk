---

I'm working on my forever project, and part of it requires that an input keep focus *all of the time*. User experience out of the window, this is the way it has to be, but `.blur()` is not cancel-able, nor is `.focusout()`. This means you can't just call `.focus()` in the `.blur()` function. You have to trick it.

Set initial focus first:

    $("#input").focus();

And then set the `re-focus`:

    $("#input").blur(function() {
        setTimeout(function() { $("#input").focus(); }, 0);
    });

Works a treat.