---title: Override selection style with CSSslug: override-selection-style-with-cssdate: 2013-07-30 14:39tags:  - css - design---You may have noticed that certain designs, such as the [amazing SI Digital website](http://sidigital.co/), have a custom style for the selection of text. When used properly, to match your designs main colour for example, this can give a really nice and polished feel.

It's really quite simple to implement as well. You can change the foreground `color` as well as the `background` color like so:

    ::selection { color: white; background: #5AB54A; }
    ::-moz-selection { color: white; background: #5AB54A; }

Not all properties can be set using `::selection` though. Properties that *can* be set are `color`, `background`, `background-color` and `text-shadow`. Though according to [this article](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection), `background-image` is ignored. Setting the background to use an image is also ignored, and it appears that opacity is also set and unable to be changed.

Still, this is a very nice feature for modern browsers, and can really add that finishing touch to your design.

