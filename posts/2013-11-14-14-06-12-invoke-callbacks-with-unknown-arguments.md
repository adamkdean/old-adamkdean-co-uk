---title: Invoke callbacks with unknown argumentsslug: invoke-callbacks-with-unknown-argumentsdate: 2013-11-14 14:06tags:  - javascript---Whilst working on some instrumentation code, I had need to pass a function and an unknown number of arguments to another function which would then time the execution of that function. This turned out to be quite easy using `fn.prototype.apply`.

Let's say that we want to call a function but execute some other code, we'd do that here:

    function invokeCallback(callback) {
      var params = Array.prototype.slice.call(arguments, 1);
      return callback.apply(null, params);
    }

And here are our three varied functions:

    function action() {
        console.log('action');
    }

    function greet(msg) {
        console.log(msg);
    }

    function nameage(name, age) {
        var msg = 'My name is ' + name + ' and my age is ' + age;
        console.log(msg);
    }

And here is how we can call them dynamically without invokeCallback having to know anything about them:

    invokeCallback(action);
    invokeCallback(greet, 'Hello!');
    invokeCallback(nameage, 'Bob', '20');

Amazing.