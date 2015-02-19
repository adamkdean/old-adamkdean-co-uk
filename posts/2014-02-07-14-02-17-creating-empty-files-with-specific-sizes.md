---title: Creating empty files with specific sizesslug: creating-empty-files-with-specific-sizesdate: 2014-02-07 14:02tags:  - linux - dd - fsutil - windows---If you're doing speed tests, you may find yourself needing large files with which to test your connection speeds and stability.

On Linux, you can do this with `dd` like so, creating a 100 MB file (or thereabouts):

    dd if=/dev/zero of=output.png bs=1M count=100

On Windows servers, you can do this using `fsutil`, like so:

    fsutil file createnew output.png 104857600

Remember, 1024 bytes in a kilobyte, 1024*1024 bytes in a megabyte, and so forth.