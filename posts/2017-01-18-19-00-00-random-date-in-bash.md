---
title: Random date in Bash
slug: random-date-in-bash
date: 2017-01-18 19:00
tags: 
 - bash
 - date
 - random
 - snippet
---
Generate a random date in bash using gdate/gshuf (gnu coreutils):

    function randomDate {
      LBOUND="01/01/2010 00:00:00 UTC"
      UBOUND="01/18/2016 00:00:00 UTC"
      LBSECS=$(gdate --date="$LBOUND" +%s)
      UBSECS=$(gdate --date="$UBOUND" +%s)
      DIFF=$(($UBSECS - $LBSECS))
      RND=$(gshuf -i 1-$DIFF -n 1)
      NEWDATE=$(($LBSECS + $RND))
      gdate -d "@$NEWDATE"
    }
