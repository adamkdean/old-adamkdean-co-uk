---

	$('.textbox').bind('onEnter', function(e) {	
		// your code here
	});
	$('.textbox').keyup(function(e) {
		if (e.keyCode == 13) 
			$(this).trigger('onEnter');
	});

It's pretty much self-explanatory. When enter is pressed, the above function fires.