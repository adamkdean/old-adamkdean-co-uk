---title: Increase playback speed on YouTubeslug: increase-playback-speed-on-youtubedate: 2013-09-08 15:28tags:  - youtube - videos---I don't know if you're impatient like me, but if you are, you probably get sick of watching tutorial/education videos on 1.0x speed playback. I went through Jon Skeet's C# videos on 1.5x - 2.0x times the speed, but YouTube chugs along on 1.0x and it takes so damn long. Just get to the point OP!

But there is a way I have discovered to gain some control over this, by forcing the video to play in the new HTML5 video player which should give you access to playback speed control on the same popup menu that you select the quality from.

Take your video ID, in this case, `1CQ0zDfX4QE` from your current URL which should look like this:

> http://www.youtube.com/watch?v=1CQ0zDfX4QE

And replace `watch` with `watch_popup` and add `&vq=large` to the end of the URL, like so:

> http://www.youtube.com/**watch_popup**?v=1CQ0zDfX4QE**&vq=large**

Now you'll be able to see the speed control from the quality popup. Hallelujah! 

![Bingo!](http://i.imgur.com/mJnXYGb.png)