---title: Resize Bitmap without major quality lossslug: resize-bitmap-without-major-quality-lossdate: 2013-06-27 16:31tags: - bitmap - image - csharp---I'm working on a [computer vision](https://en.wikipedia.org/wiki/Computer_vision) project at the moment. Whilst working on it, I've had to resize a few bitmaps due to the webcam library I'm using not being able to properly set the resolution of the camera.

I found this on StackOverflow, and it works quite well. There are a few quality differences, such loss of sharpness due to smoothing, but it's only noticeable when you put the two images side to side.

    Bitmap resized = new Bitmap(desiredHeight, desiredWidth);
    using (Graphics graphics = Graphics.FromImage(resized))
    {
        graphics.SmoothingMode = SmoothingMode.HighQuality;
        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
        graphics.DrawImage(originalImage,
            new Rectangle(0, 0, desiredHeight, desiredWidth));
    }
    pictureBox1.Image = resized;

Like I said, works quite well, and definitely one for the snippet bin!
