$(document).ready(function () {
    'use strict';
    
    /* ---------------------------------------------
    Pre loader
    --------------------------------------------- */
    $(window).on('load', function() {
        // will first fade out the loading animation
        $(".preloader").fadeOut();
        //then background color will fade out slowly
        $("#faceoff").delay(200).fadeOut("slow");
    });
    
    /* ---------------------------------------------
    Wow
    --------------------------------------------- */
    var wow = new WOW({
		mobile: false
	});
	wow.init();
    
    /* ---------------------------------------------
    Smooth scroll
    --------------------------------------------- */
    $('a[href*="#"]:not([href="#"]):not(a[data-toggle="collapse"], a[data-toggle="tab"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
    /*----------------------------------------
    Header Image Slider
    --------------------------------------*/
    if($('#header-bg-slider').length > 0){
        $("#header-bg-slider").owlCarousel({
            singleItem: true,
            autoPlay: true,
            pagination: false,
            lazyLoad: true,
            addClassActive: true,
            transitionStyle : "fade"
        });
    }
    
    /*----------------------------------------
    Carousel Navfix
    --------------------------------------*/
    function carouselNavFix(elem){
        var offset = elem.offset();
        if(offset.left < 40){
            elem.css('margin', '0');
            elem.addClass('thin-space');
        }
    }
    
    if($('#screenshots').length > 0){
        carouselNavFix($('#screenshots'));
    }
    
    if($('#reviews').length > 0){
        carouselNavFix($('#reviews'));        
    }
    
    /*----------------------------------------
    Screenshot Slider 
    --------------------------------------*/
    if($('#screenshot-carousel').length > 0){
        $("#screenshot-carousel").owlCarousel({
            items: 3,
            itemsDesktop : [1200,3],
            itemsDesktopSmall: [992,3],
            autoPlay: true,
            stopOnHover: true,
            navigation: true,
            navigationText: ["<i class=\"fa fa-angle-left\"></i>", "<i class=\"fa fa-angle-right\"></i>"],
            pagination: false,
            lazyLoad: true,
            addClassActive: true
        });
    }
    
    /*----------------------------------------
    Review Carousel
    --------------------------------------*/
    if($('#review-carousel').length > 0){
        $("#review-carousel").owlCarousel({
            singleItem: true,
            autoPlay: true,
            stopOnHover: true,
            navigation: true,
            navigationText: ["<i class=\"fa fa-angle-left\"></i>", "<i class=\"fa fa-angle-right\"></i>"],
            pagination: false,
            lazyLoad: true,
            addClassActive: true
        });
    }
    
    /*----------------------------------------
    Review Carousel
    --------------------------------------*/
    if($('.flex_text').length > 0){
        $('.flex_text').flexslider({
            animation: "slide",
            selector: ".slides li",
            controlNav: false,
            directionNav: false,
            slideshowSpeed: 4000,
            touch: true,
            useCSS: false,
            direction: "vertical",
            before: function(slider){        
             var height = $('.flex_text').find('.flex-viewport').innerHeight();
             $('.flex_text').find('li').css({ height: height + 'px' });
            }		
        });  
    }
    
    /*----------------------------------------
    Bootstrap Accordion
    --------------------------------------*/
    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
    });
    
    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
    });
    
    /*----------------------------------------
    Magnific Popup
    --------------------------------------*/
	$('.image-large').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $('.video-play-icon').magnificPopup({
        type: 'iframe'
    });
    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        }
    });
    
    /*----------------------------------------
    Counto
    --------------------------------------*/
    function animateCountTo(ct) {
        if ($.fn.visible && $(ct).visible() && !$(ct).hasClass('animated')) {
            $(ct).countTo({speed: 2000});
            $(ct).addClass('animated');
        }
    }
    
    function initCountTo() {
        var counter = $('.fact-counter');
        counter.each(function () {
            animateCountTo(this);
        });
    }
    
    initCountTo();
    
    /*----------------------------------------
    Ajax Contact Form
    --------------------------------------*/
	
	// Function for email address validation
	function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

		return pattern.test(emailAddress);

	}
	$("#contactForm").on('submit', function (e) {
		e.preventDefault();
		var data = {
			name: $("#name").val(),
			email: $("#email").val(),
            subject: $("#subject").val(),
			message: $("#message").val()
		};

		if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) && (data['subject'].length > 1)) {
			$.ajax({
				type: "POST",
				url: "sendmail.php",
				data: data,
				success: function () {
					$('#contactForm .input-success').delay(500).fadeIn(1000);
					$('#contactForm .input-error').fadeOut(500);
				}
			});
		} else {
			$('#contactForm .input-error').delay(500).fadeIn(1000);
			$('#contactForm .input-success').fadeOut(500);
		}

		return false;
	});
    
    /*----------------------------------------
    Newsletter Subscribe
    --------------------------------------*/
	$(".subscribe-form").ajaxChimp({
		callback: mailchimpResponse,
		url: "http://codepassenger.us10.list-manage.com/subscribe/post?u=6b2e008d85f125cf2eb2b40e9&id=6083876991" // Replace your mailchimp post url inside double quote "".  
	});

	function mailchimpResponse(resp) {
        if (resp.result === 'success') {
		 
			$('.newsletter-success').html(resp.msg).fadeIn().delay(3000).fadeOut();
			
		} else if (resp.result === 'error') {
			$('.newsletter-error').html(resp.msg).fadeIn().delay(3000).fadeOut();
		}
	}
    
    /*----------------------------------------
    Scroll to top
    --------------------------------------*/
    function showToTop(){
        if($(window).scrollTop() > 500){
            $('#to-top').fadeIn();
        } else {
            $('#to-top').fadeOut();
        }
    }
    
    showToTop();
    
    /*----------------------------------------
    All window events
    --------------------------------------*/
    $(window).on('resize orientationchange', function() {
        carouselNavFix(); 
    });
    $(window).on('scroll', function() {
        initCountTo();
        showToTop();
    });
});