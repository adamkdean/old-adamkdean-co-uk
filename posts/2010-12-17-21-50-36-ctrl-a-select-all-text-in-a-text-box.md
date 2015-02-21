---title: Ctrl+A Select all text in a text boxslug: ctrl-a-select-all-text-in-a-text-boxdate: 2010-12-17 21:50tags: - winforms - csharp---Another quick-snip here. Add select all (ctrl+a) to a regular textbox in less than 7 seconds, and here's how. Using the KeyDown event, look for control and A, and then select all, suppressing the keypress to stop the pingggggg noise:

    private void txtInput_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Control && e.KeyCode == Keys.A)
        {
            txtInput.SelectAll();
            e.Handled = true;
            e.SuppressKeyPress = true;
        }
    }

And there you have it. Enjoy
