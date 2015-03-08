---

There may be some fandangled way of using the AWS API to get your instance id and then from that, get your public hostname, but I have discovered a much easier way. 

Bind to `0.0.0.0`.

![sudo nc -l 0.0.0.0 80](http://i.imgur.com/zyYHkpi.png)

As you can see, I can now access it via my external browser.