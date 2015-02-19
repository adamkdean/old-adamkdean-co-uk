---title: Ordering and filtering objects with ng-repeatslug: ordering-and-filtering-objects-with-ng-repeatdate: 2014-03-26 10:25tags:  - angularjs - javascript---AngularJS allows you to iterate over collections using the `ng-repeat` directive. You have the ability to order and filter the collection, but this only works for arrays, not for objects. You'd think that you'd retain the functionality of arrays, considering the object is treated like one, but you don't.

The solution to this is to push the contents of the object into an array using a `filter`. By keeping the references intact, we are still able to bind to the objects, as they are essentially the same object.

    .filter('objectAsArray', function() {
        return function(object) {
            var array = []; 
            for (item in object) {
                array.push(object[item]);
            }
            return array;
        }
    });

Let's look at what we'd need if we wanted to order and/or filter an array:

    <p ng-repeat="item in itemArray | orderBy: 'order' | filter: {visible: true}">
        {{item}}
    </p>

But what if that was an object? Well, we just pop the `objectAsArray` filter in:

    <p ng-repeat="item in itemObj | objectAsArray | orderBy: 'order' | filter: {visible: true}">
        {{item}}
    </p>

This is indeed a very useful little filter. 

View the [live plunkr example here](http://plnkr.co/edit/RObsrXoSSkRA271w9WJr?p=preview).