---title: Detect when ng-options has finished renderingslug: detect-when-ng-options-has-finished-renderingdate: 2013-12-10 12:50tags:  - javascript - angularjs---If you want to fire an event when `ng-options` finishes rendering options, you can do so by watching the model with `scope.$watch` and then queuing up the event code to fire on the next digest cycle with `scope.$evalAsync`. Like so:

    scope.$watch(model, function() {
        scope.$evalAsync(function() {
            // event
        });
    });

If you have a directive that encapsulates a select and ng-options, and for example, you want to fire some jQuery code to turn the select into a multiselect box once ng-options has executed, then you could do something like this:

    .directive('ngMultiselect', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: false,
            template: function (element, attrs) {
                console.log('template');
                return '<div><select class="multiselect" name="' + attrs.name + 
                    '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + 
                    '"' + ((attrs.required) ? ' required' : '') + '></select></div>';
            },
            link: function(scope, element, attrs) {
                scope.$watch(attrs.ngModel, function() {
                    scope.$evalAsync(function() {
                        $('.multiselect').multiselect();
                    });
                });
            }
        }   
    });

Bear in mind that every change to the model would fire the event, so you might need to put some sort of check in there, but in terms of firing after render, works perfect.

One way of cleanly making sure you only fire once is like so:

    link: function(scope, element, attrs) {
        scope.$watch(attrs.ngModel, function() {
            if (!angular.isDefined(scope.multiselectInitialized)) {
                scope.multiselectInitialized = true;
                scope.$evalAsync(function() {
                    $('.multiselect').multiselect();
                });
            }
        });
    }

**Update:** Here is some sample HTML for the directive. I also have a bunch of CSS for it but I don't think that is relevant.

    <p>availableOptions: `{{availableOptions}}`</p>
    <p>selectedOptions: `{{selectedOptions}}`</p>

    <ng-multiselect 
        multiple="true"
        ng-model="selectedOptions"
        options="o.label for o in availableOptions"
        change="selected()">
    </ng-multiselect>