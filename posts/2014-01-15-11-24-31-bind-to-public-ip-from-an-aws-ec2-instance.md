---title: Bind to public IP from an AWS EC2 instanceslug: bind-to-public-ip-from-an-aws-ec2-instancedate: 2014-01-15 11:24tags:  - aws - ec2 - linux---One problem I have faced with Amazon Web Services EC2 instances is binding to a public IP or hostname. When you get an EC2 instance, you will have access to your local IP, and to your local hostname, but if you want to connect to the instance from an external source, you have to bind to a public interface.

There may be some fandangled way of using the AWS API to get your instance id and then from that, get your public hostname, but I have discovered a much easier way. 

Bind to `0.0.0.0`.

![sudo nc -l 0.0.0.0 80](http://i.imgur.com/zyYHkpi.png)

As you can see, I can now access it via my external browser.