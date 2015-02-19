---title: Detect enter key hit using jQueryslug: detect-enter-key-hit-using-jquerydate: 2013-07-03 14:33tags:  - jquery - javascript---Just a little snippet today, for future reference more than anything. 

	$('.textbox').bind('onEnter', function(e) {	
		// your code here
	});
	$('.textbox').keyup(function(e) {
		if (e.keyCode == 13) 
			$(this).trigger('onEnter');
	});

It's pretty much self-explanatory. When enter is pressed, the above function fires.