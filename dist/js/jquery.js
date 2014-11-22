'use strict';

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

	// HAMBURGER

/*

	$("#hamburger").click(function(){
		
		var contentWidth = $("#content").width();

		$('#content').css('width', contentWidth);

		$('#container').animate({"marginLeft": ["70%", 'easeOutExpo']}, {
			duration:700
		});

		//$('#content').css('display','block');//



	});

	$('#content').click(function(){

		$('#container').animate ({'marginLeft': ['0', 'easeOutExpo']},{
			duration: 700,
			complete : function(){
				$('content').css('width', 'auto');
			}
		});


	});

*/
	var navOpen = false;

	$('#hamburger').click(function(){
		if (!navOpen) {
			$('nav').animate({left: '0'}, 500);
			$('.content').animate({marginLeft:'350'}, 500);
			navOpen = true;
		} else {
			$('nav').animate({left: '-350'}, 500);
			$('.content').animate({marginLeft:'0'}, 500);
			navOpen = false;
		}
	});

});

