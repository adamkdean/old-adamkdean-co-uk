---title: Using another private key with gitslug: using-another-private-key-with-gitdate: 2014-08-05 09:57tags:  - osx - bash - ssh - git---It's quite normal to have different private keys for different git servers, but how do you provide a different identity file like you do with SSH?

The answer comes in a text file; `config`.

Create a text file in your ssh directory, which is usually `.ssh`:

    $ touch ~/.ssh/config

Then open it with your favourite text editor, for me, this is currently atom:

    $ atom ~/.ssh/config

Now, we can use this file to configure different hosts. The following should be pretty self explanatory. For your information, in case you're a bit confused, the identity file is your private key.

    Host example.com
        HostName git.example.com
        User git
        IdentityFile /Users/adam/.ssh/yourkey
        IdentitiesOnly yes

You'll notice the host and hostname are different. This means you can have a host configured for example.com which actually points to another hostname, such as a source control server, e.g. git.example.com.