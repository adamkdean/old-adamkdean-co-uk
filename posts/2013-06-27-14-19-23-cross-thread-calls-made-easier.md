---title: Cross thread calls made easierslug: cross-thread-calls-made-easierdate: 2013-06-27 14:19tags: - winforms - csharp - thread-safety - delegates - generics - threading---Back in 2010 I wrote a blog post about [cross thread calls](http://www.adamkdean.co.uk/blog/read/2/cross-thread-calls-made-easy), showing how to overcome invalid cross-thread operations and change windows forms from other threads. It was simple but a little bit messy.

Well, things are easier now, and have been for a while. Instead of declaring delegates and invoking them, you can now use generic delegates and save yourself the hassle of declaring new delegates for every method signature.

For example, where before you had to do this:

    private delegate void ObjectDelegate(object obj);

    private void UpdateTextBox(object obj)
    {
        if (InvokeRequired)
        {
            ObjectDelegate method = new ObjectDelegate(UpdateTextBox);
            Invoke(method, obj);
            return;
        }
    }

You can now do this:

    private void UpdateTextBox(string s)
    {
        if (InvokeRequired)
        {
            Action<string> action = new Action<string>(UpdateTextBox);
            Invoke(action, s);
            return;
        }
    }

Another great thing is if you have to pass multiple objects then it's as simple as adding more types within the angle brackets. You can also substitute `Action<T>` for `var` to save space. Let's say for example, you need to update a label from another thread, the follow works great:

    private void UpdateLabel(Label label, string s)
    {
        if (InvokeRequired)
        {
            var action = new Action<Label, string>(UpdateLabel);
            Invoke(action, label, s);
            return;
        }

        label.Text = s;
    }

This will save you a bunch of time, and is essentially identical to the previous method.

For more information on `Action<T> Delegate`s, see [this MSDN article](http://msdn.microsoft.com/en-us/library/018hxwa8.aspx).
