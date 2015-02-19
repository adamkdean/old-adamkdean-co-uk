---title: Detect if JS is running under Nodeslug: detect-if-js-is-running-under-nodedate: 2014-07-02 10:26tags:  - node - snippet - javascript---Here is a snippet for how to detect if JavaScript is running under Node:

    var isNode = typeof process !== "undefined" && 
        {}.toString.call(process) === "[object process]";

We check here whether the variable `process` is defined, and if it is, we check it's type to make sure it's the proper process object and not just a regular old JavaScript object.