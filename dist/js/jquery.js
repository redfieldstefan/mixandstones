'use strict';

$(document).ready(function(){

	var headlineOpen=false;

	$('.options-button').click(function(event){
		if (!headlineOpen){
			$('#headline-list').animate({marginTop:'125px'}, 500);
		
			$('.button-1').css({display: "none"});
			$('.button-2').css({display: "inline"});
			headlineOpen = true;
		}
		else {
			$('#headline-list').animate({marginTop:'-75px'}, 500);
			
			$('.button-1').css({display: "inline"});
			$('.button-2').css({display: "none"});
			headlineOpen = false;

		}
	});



	$('#headline-list .icon:nth-child(1)').click(function(event) {
    // Preventing default action of the event
    event.preventDefault();
    // Getting the height of the document
    var n = $(document).height();
    $('html, body').animate({ scrollTop: 100 }, 800);

//                                       |    |
//                                       |    --- duration (milliseconds) 
//                                       ---- distance from the top
		$('#headline-list').animate({marginTop:'-75px'}, 500);
		$('.button-1').css({display: "inline"});
		$('.button-2').css({display: "none"});
		headlineOpen = false;
	});

	$('#headline-list .icon:nth-child(2)').click(function(event){
		event.preventDefault();
		var n = $(document).height();
		$('html, body').animate({scrollTop: 800}, 800);
		$('#headline-list').animate({marginTop:'-75px'}, 500);
		$('.button-1').css({display: "inline"});
		$('.button-2').css({display: "none"});
		headlineOpen = false;
	});

	$('#headline-list .icon:nth-child(3)').click(function(event){
		event.preventDefault();
		var n = $(document).height();
		$('html, body').animate({scrollTop: 1500}, 800);
		$('#headline-list').animate({marginTop:'-75px'}, 500);
		$('.button-1').css({display: "inline"});
		$('.button-2').css({display: "none"});
		headlineOpen = false;
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

