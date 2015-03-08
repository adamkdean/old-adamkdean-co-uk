---

> GET http://localhost/fonts/glyphicons-halflings-regular.woff 404 (Not Found) 

To fix this, add a MIME type for `.woff` as `application/x-font-woff`. 

Don't just add `application/x-woff` or you'll get Chrome nagging you about resources interpreted as fonts but transferred with MIME types of application/x-woff.