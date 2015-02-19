---title: Private set property: public get, private setslug: private-set-property-public-get-private-setdate: 2010-12-29 21:51tags:  - c---Just come across something I haven't needed before, a property read-only from the outside, but writeable from the inside.. I present to you the private set property!

    public SocketException LastErrorException { get; private set;  }

You can set it from within the class, but not from outside. Simple!