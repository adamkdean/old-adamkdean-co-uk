---title: jQuery Categories using isotopeslug: jquery-categories-using-isotopedate: 2013-07-01 16:41tags:  - javascript - jquery - isotope - design---While I don't do much design stuff nowadays, I do enjoy it when I get the chance. After discussing a masonry style grid with dynamic categories with [my other half](http://www.kirstyrose.com) this weekend, I tried to find the implementation online. Failing that, I thought this was a great chance to do a bit of *design*.

What I wanted was a grid of divs which I could filter depending upon their class. This could be used for a portfolio for example, allowing the user to filter whether they wanted to see websites, code snippets or graphic designs.

![It's all just apples and oranges...and bananas](http://i.imgur.com/QeMkBmN.png)

I put the design together, and had it working fine with jQuery, but it didn't move nicely. I remember hearing about jQuery Masonry and decided to give it a go. To be honest with you it is pretty rubbish, it feels *old*. I was on StackOverflow looking for answers to the most ridiculous problems when I read about [isotope](http://isotope.metafizzy.co/). 

I gave it a go and it's actually pretty neat!

Apart from a small issue where images weren't being loaded before size calculations were made -- which was quickly fixed by using [David DeSandro](http://desandro.com/)'s [imagesLoaded](https://github.com/desandro/imagesloaded) plugin -- everything worked fine. I highly recommend using isotope, and may have to come up with an excuse to use it again!

Find the project on GitHub: [https://github.com/Imdsm/jQuery.Categories](https://github.com/Imdsm/jQuery.Categories)  
See a working demo: [http://imdsm.github.io/jQuery.Categories/](http://imdsm.github.io/jQuery.Categories/)