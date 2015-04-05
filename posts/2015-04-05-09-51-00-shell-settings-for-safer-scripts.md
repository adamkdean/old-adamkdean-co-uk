---
title: Shell settings for safer scripts
slug: 2015-04-05-09-51-00-shell-settings-for-safer-scripts
date: 2015-04-05 9:51
tags:
 - shell
 - bash
 - linux
---

I was just reading through one of Progrium's scripts when I came across `set -eo pipefail` at the beginning of a script. Having not seen that before, I decided to Google. This is the result of that.
    
You can use `set` to manipulate shell variables and functions. Some of these can help you write safer scripts.

    set -e

If any command fails, `set -e` will make the entire script fail, rather than just skipping onto the next line. If you want to allow a line to fail then you can pop `|| true` onto the end of it. 

    set -u

This will treat unset variables as an error, and immediately exit the script.

    set -o pipefail

By default only the last command in a list of piped commands returns a failure code if it fails. By using `set -o pipefile`, if any of the commands fail, the line will fail. Using this with `set -e` means that if any command in a piped command fails, the script will fail.

Now back to [my reading...](https://github.com/progrium/docker-consul/blob/master/start)
