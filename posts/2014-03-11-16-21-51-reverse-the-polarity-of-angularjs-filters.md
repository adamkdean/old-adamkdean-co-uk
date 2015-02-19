---title: Reverse the polarity of AngularJS filtersslug: reverse-the-polarity-of-angularjs-filtersdate: 2014-03-11 16:21tags:  - javascript - angularjs---AngularJS allows you to use strings, objects, and functions as filter objects. You can use them to filter certain text, such as a name in a list of names, or a number in a list of phone numbers. But what happens when you want to filter *out* those results?

We'll pretend we have a big list of open and closed support tickets, and a checkbox, which we will use to toggle the filter. When it's on, we want to filter out closed tickets. When it's off, we want to see all tickets. 

    <input type="checkbox" 
        ng-true-value="closed" 
        ng-false-value="" 
        ng-model="hideClosedTickets"> 
    Hide closed tickets

`ng-true-value` and `ng-false-value` are interesting. They allow you to override the true/false value of the checkbox, setting `hideClosedTickets` to `closed` when checked, instead of just `true`.

Now let's use the `ng-repeat` directive to list our tickets. It'll look like this:

    <ul>
        <li ng-repeat="ticket in tickets">
            # {{ticket.id}} - {{ticket.title}} - {{ticket.status}}
        </li>
    </ul>

Which will give us our pretend output:

    # 1 - Example ticket - open  
    # 2 - My computer is broken - closed 
    # 3 - jQuery fails to load - open  
    # 4 - Somebody stole my drink - closed 
    # 5 - Internet isn't working - open  

To filter these, we're going to leverage the `filter` function of `ng-repeat` and the scope variable `hideClosedTickets` which we set before. We'll pass in an object so that we can match against the ticket status only. 

We *could* just filter the tickets for open tickets only like so:

    <li ng-repeat="ticket in tickets | filter: {status: 'open'}">

but what if we have other ticket statuses, such as `blocked`, `awaiting reply`, or `resolved` etc?

For this, we need to reverse the polarity of the filter, so we match against the text. We can do this by prefixing the filter with the logical-not operator, the mighty `!`:

    <li ng-repeat="ticket in tickets | filter: {status: '!' + hideClosedTickets}">

The only problem is here is that if `hideClosedTickets` is an empty string, it's not going to show anything. We do this by first checking that `hideClosedTickets` is set and then matching against it:

    <li ng-repeat="ticket in tickets | filter: {status: hideClosedTickets && '!' + hideClosedTickets}">

When the checkbox is checked, `hideClosedTickets` equals `closed`, and we will get this output:

    # 1 - Example ticket - open  
    # 3 - jQuery fails to load - open  
    # 5 - Internet isn't working - open  

When the checkbox is unchecked, `hideClosedTickets` is an empty string, so we get everything:

    # 1 - Example ticket - open  
    # 2 - My computer is broken - closed 
    # 3 - jQuery fails to load - open  
    # 4 - Somebody stole my drink - closed 
    # 5 - Internet isn't working - open  

This is a neat little trick, but not always apparent at first. 

If you have a better way of doing this, please post your solution in the comments!

#Update

It has just been pointed out to me that adding `!` to the `ng-true-value` will do the trick as well, so:

    <input type="checkbox" 
        ng-true-value="!closed" 
        ng-false-value="" 
        ng-model="hideClosedTickets">

And then:

    <li ng-repeat="ticket in tickets | filter: {status: hideClosedTickets}">

~~I'm not sure why this didn't occur to me earlier, I was sure I tried it first, but maybe it's just been a long day. ~~

Update: I remember now why I didn't do it this way. I wanted to use the value ("closed") elsewhere, where I was ng-show rather than ng-repeat filter. Both approaches work, pick which suits you best!