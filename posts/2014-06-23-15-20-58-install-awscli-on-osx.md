---title: Install awscli on OSXslug: install-awscli-on-osxdate: 2014-06-23 15:20tags:  - osx - awscli - ec2 - aws---Installing `awscli` on OSX is easy. If you don't already have it, install pip (python's package manager).

Now, to install `awscli`, do this:

    pip install awscli

Then configure it using:

    aws configure

Now test it with:

    aws ec2 describe-regions

