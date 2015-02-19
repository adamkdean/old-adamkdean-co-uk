---title: Proper sorting with JavaScriptslug: proper-sorting-with-javascriptdate: 2014-04-08 16:34tags:  - sorting - algorithms - javascript---If we're trying to sort an array, we're going to have a bad time. JavaScript doesn't do a good job of sorting out of the tin, so we're going to have to implement our own sorting algorithm. It's not really advanced enough to use the term algorithm, but let's get to it.

First, let's take an array. We can either have numbers, numbers in strings, or strings. Regardless of whether we have numbers in strings or actual numbers, the sorting will still be back to front by default. For example, [1, 8, 10, 12] will still become [1, 10, 12, 8] when we run `sort()`.

So let's get that array.

    var list = ['10', '12', '14', '16', '18', '20', '8'];

So now we have an array. It isn't sorted how you'd expect it to be. If we run `sort()`, we'll end up with a peculiar result. 10 will come before 8, as will 20, all the way up to 7...

    // what we'll see
    ["10", "12", "14" "16", "18", "20", "8"]

    // what we want to see
    ["8", "10", "12", "14", "16", "18", "20"]

To sort this, we're going to have to write our own sorting algorithm. We need to account for strings, numbers inside strings, numbers. The good thing about JavaScript `sort()` is that you can pass your own predicate. A predicate is an expression which returns either true or false. Is a greater than b? 

A simple way to perform a numerical sort is:

    list.sort(function (a, b) {
        return a - b;
    });

But this isn't going to work properly for strings. A more advanced way of sorting it, which will account for strings as well, will check whether numbers are involved, and if so, convert the strings to numbers before comparing.

    list.sort(function (a, b) {
        var ai = parseFloat(a), bi = parseFloat(b);
        return (isNaN(ai) || isNaN(bi)) 
            ? a > b ? 1 : a < b ? -1 : 0
            : ai > bi ? 1 : ai < bi ? -1 : 0;
    });

Using either of these predicates with numbers/numbers-in-strings will output what you'd expect:

    ["8", "10", "12", "14", "16", "18", "20"]

But if we're using letters, such as a list of bra cup sizes, the advanced predicate will come out on top. Let's take a look at another example. In this, we're going to use said list of bra cup sizes and sort them. We'll see how the numerical predicate falls on it's face, and how the combined predicate doesn't.

    var list = ['FF', 'GG', 'F', 'DD', 'K', 'E', 'G', 'D', 'JJ', 'J', 'HH', 'KK', 'H'];

    list.sort(function(a, b) { return a - b; });
    // outputs: 
    // ["FF", "H", "F", "DD", "K", "E", "GG", "D", "JJ", "J", "HH", "KK", "G"]

    list.sort(function (a, b) {
        var ai = parseFloat(a), bi = parseFloat(b);
        return (isNaN(ai) || isNaN(bi)) 
            ? a > b ? 1 : a < b ? -1 : 0
            : ai > bi ? 1 : ai < bi ? -1 : 0;
    });
    // outputs: 
    // ["D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J", "JJ", "K", "KK"]
 
It would be interesting to know why `sort()` doesn't use something like this by default. Maybe this will be the subject of a further blog post.