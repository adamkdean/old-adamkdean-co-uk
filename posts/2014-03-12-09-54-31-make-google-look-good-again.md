---

![Bad Google!](http://i.imgur.com/C0ZnCUR.png)

There is a fix to tide you over though, in the case that Google drags their heels. If you're using Chrome, that is. Install [Stylish](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe) (an extension which allows you to override a site's style), and install any theme for Google. Then edit it, delete all the existing css, and paste this in:

    #res h3 { 
      font-size: 16px !important; 
    }
    #newsbox, .rgsep { 
      display: none;
    }

This will make your page titles more bearable and remove the giant newsbox from the SERP.

![Looking much better](http://i.imgur.com/qnNfVE2.png)

Looking much better!