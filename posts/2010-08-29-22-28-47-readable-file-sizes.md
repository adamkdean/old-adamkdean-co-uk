---title: Readable File Sizesslug: readable-file-sizesdate: 2010-08-29 22:28tags: - csharp---In an effort to fill up this blog with code, I will over the next few weeks be looking back over my snippets, finding useful methods and posting them. Today's feature is a simple text formatter, which converts a long (representing bytes) into a string, giving you a nice readable file size.

So without further ado:

    private static string GetReadableBytes(long lSize)
    {
        double size = lSize;
        if (size >= 1024 && size < 1048576)
            return string.Format("{0:#,0.00} KB", (size / 1024));

        else if (size >= 1048576 && size < 1073741824)
            return string.Format("{0:#,0.00} MB", (size / 1048576));

        else if (size >= 1073741824 && size < 1099511627776)
            return string.Format("{0:#,0.00} GB", (size / 1073741824));

        else if (size >= 1099511627776)
            return string.Format("{0:#,0.00} TB", (size / 1099511627776));

        else return string.Format("{0} B", size);
    }

And here you can see the output.

    /* Bytes                    Readable Size
     * =====                    =============
     * 436                  ->  436 B
     * 2159                 ->  2.11 KB
     * 36236                ->  35.39 KB
     * 2362893              ->  2.25 MB
     * 276227272            ->  263.43 MB
     * 62367298764          ->  58.08 GB
     * 3623647473473        ->  3.30 TB
     * 352635208736296      ->  320.72 TB
     * 236363536873629626   ->  214,971.38 TB
     **/

Enjoy!
