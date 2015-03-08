---

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