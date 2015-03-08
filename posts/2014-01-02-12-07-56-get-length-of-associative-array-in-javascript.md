---

What this means is that if you have a multi-dimensional array (which would be like `array[x][y]`):

    [
        a: [a, b, c],
        b: [a, b, c],
        c: [a, b, c]
    ]

Which could be built like so:

    var chars = ['a', 'b', 'c'],
        arr = [],
        x, y;

    for(x = 0; x < 3; x++) {
        arr[chars[x]] = [];
        for(y = 0; y < 3; y++) {
            arr[chars[x]][chars[y]] = true;
        }
    }

Then if you wanted to get the length of the first dimension of this array, `arr.length` isn't going to work. You'll get `0`. If you extend the `Object` prototype, you can add in a simple key counting method like so:
  
    Object.prototype.getLength = function() {
        var len = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                len++;
            }
        }  
        return len;
    }

This works perfectly, as you can see:

    > console.log(arr.length, arr.getLength());

    0, 3

Another, probably safer, way of doing this would be to put it into a function rather than extending the Object prototype:

    var getAssocArrayCount = function(array) {
        var len = 0;
        for (var key in array) {
            if (array.hasOwnProperty(key)) {
                len++;
            }
        }  
        return len;
    }

And then simply call it like so:

    > console.log(arr.length, getAssocArrayCount(arr));

    0, 3