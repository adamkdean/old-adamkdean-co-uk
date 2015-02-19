---title: Unity3d web player MIME typeslug: unity3d-web-player-mime-typedate: 2013-05-05 17:37tags:  - iis - unity3d - mime-types---IIS doesn't like serving unknown MIME types, and one of these happens to be the *unity3d* file for Unity Web Player. If you want it to serve this file, you have to go to MIME Types under IIS, and add a mime with the extension `.unity3d` and type `application/vnd.unity`.

![MIME Type](http://i.imgur.com/KdZJqIg.png)

Woop. Now I can actually serve content. Thanks, overly protective IIS.