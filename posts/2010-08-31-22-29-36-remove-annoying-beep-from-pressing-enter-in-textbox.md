---title: Remove annoying beep from pressing enter in textboxslug: remove-annoying-beep-from-pressing-enter-in-textboxdate: 2010-08-31 22:29tags: - csharp - winforms---Continuing with useful snippets and methods, today I present you mighty readers with a very useful
and simple way to get rid of the annoying sound from pressing enter in a textbox. We've all had it, trying to make enter take us from the username, to the password, and then to the submit button.. but that sound.. must..claw..eyes..out... or ears.. but anyway, it's really easy, read and learn:

    private void txtInput_KeyUp(object sender, KeyEventArgs e)
    {
        if (e.KeyCode == Keys.Enter)
        {
            e.SuppressKeyPress = true;
        }
    }

    private void txtInput_KeyPress(object sender, KeyPressEventArgs e)
    {
        if (e.KeyChar == (char)Keys.Enter)
        {
            // any logic would go here
            e.Handled = true;
        }
    }

And there you have it. Very easy, very simple and very very useful.

Now for me, back to work, a friend of mine Mihn was talking to me about refactoring yesterday, little did he know he'd plant seeds that would grow into enormous fruitition* when I'd overhaul the whole administrator area of the new site at work and change it from web based to a desktop application.. damn you Mihner, damn you!

\* I hearby declare fruitition a real word.
