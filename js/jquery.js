$(document).ready(function(){

	$('.headline-container ul li:nth-child(2)').click(function(event) {
    // Preventing default action of the event
    event.preventDefault();
    // Getting the height of the document
    var n = $(document).height();
    $('html, body').animate({ scrollTop: 100 }, 200);
//                                       |    |
//                                       |    --- duration (milliseconds) 
//                                       ---- distance from the top
	});

	$('.headline-container ul li:nth-child(3)').click(function(event){
		event.preventDefault();
		var n = $(document).height();
		$('html, body').animate({scrollTop: 800}, 400);
	});

	$('.headline-container ul li:nth-child(4)').click(function(event){
		event.preventDefault();
		var n = $(document).height();
		$('html, body').animate({scrollTop: 1500}, 400);
	});

	// RECIPE PAGE//

	$('.recipe-button').click(function(event){
		event.preventDefault();
		var n = $(document).height();
		$('html, body').animate({scrollTop: 750}, 400);
	});




})

