---title: Fix jagged fonts in Chrome/WebKitslug: fix-jagged-fonts-in-chrome-webkitdate: 2013-07-10 14:50tags:  - webkit - chrome - css---Just a quick post today, more of a reminder for myself than anything. The following is a great way to fix jagged fonts when using font kits with Chrome/WebKit based browsers. 

The following is what you'd expect to see when defining a font face:

    @font-face {
      font-family: 'FontName';
      src: url('../fonts/FontName.eot');
      src: url('../fonts/FontName.eot?#iefix') format('embedded-opentype'),
           url('../fonts/FontName.woff') format('woff'),
           url('../fonts/FontName.ttf') format('truetype'),
           url('../fonts/FontName.svg') format('svg');
      font-weight: normal;
      font-style: normal;
    }

Well, [apparently Chrome uses the SVG and does not like it coming last](http://www.adtrak.co.uk/blog/font-face-chrome-rendering/).

Append this to your CSS and you'll get much better results:

    @media screen and (-webkit-min-device-pixel-ratio:0) {
      @font-face {
        font-family: 'FontName';
        src: url('../fonts/FontName.svg') format('svg');
      }
    }

Without fix, and with the fix:

![Fix jagged fonts in Chrome/WebKit](http://i.imgur.com/Ubxkcod.png)