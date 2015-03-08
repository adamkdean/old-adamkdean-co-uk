---

    var isNode = typeof process !== "undefined" && 
        {}.toString.call(process) === "[object process]";

We check here whether the variable `process` is defined, and if it is, we check it's type to make sure it's the proper process object and not just a regular old JavaScript object.