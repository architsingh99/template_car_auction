/*
 Project name:       ibid
 Project author:     ModelTheme
 File name:          Custom JS
*/

(function ($) {
    'use strict';

    $(document).ready(function() {
        if ( jQuery( ".slider-moving" ).length ) {
            //moving slider
            var scrollSpeed = 60;        // Speed in milliseconds
            var step = 1;               // How many pixels to move per step
            var current = 0;            // The current pixel row
            var imageWidth = 3473;      // Background image width
            var headerWidth = 1170;     // How wide the header is.

            //The pixel row where to start a new loop
            var restartPosition = -(imageWidth - headerWidth);

            function scrollBg(){
                //Go to next pixel row.
                current += step;
                
                //If at the end of the image, then go to the top.
                if (current == restartPosition){
                    current = 0;
                }
                
                //Set the CSS of the header.
                jQuery('.slider-moving').css("background-position",current+"px 0");
            }

            setInterval(scrollBg, scrollSpeed);
        }
        

        if ( jQuery( ".single .grouped_form" ).length ) {
            if ( jQuery( ".single .wishlist-container" ).length ) {
                jQuery(".single .wishlist-container").insertAfter(".single_add_to_cart_button");
            }
        }

        //Begin: Validate and Submit contact form via Ajax
        jQuery("#contact_form").validate({
            //Ajax validation rules
            rules: {
                user_name: {
                    required: true,
                    minlength: 2
                },
                user_message: {
                    required: true,
                    minlength: 10
                },
                user_subject: {
                    required: true,
                    minlength: 5
                },
                user_email: {
                    required: true,
                    email: true
                }
            },
            //Ajax validation messages
            messages: {
                user_name: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                user_message: {
                    required: "Please enter a message",
                    minlength: "Your message must consist of at least 10 characters"
                },
                user_subject: {
                    required: "Please provide a subject",
                    minlength: "Your subject must be at least 5 characters long"
                },
                user_email: "Please enter a valid email address"
            },
            //Submit via Ajax Form
            submitHandler: function() {
                jQuery('#contact_form').ajaxSubmit();
                jQuery('.success_message').fadeIn('slow');
            }
        });
        //End: Validate and Submit contact form via Ajax
        if (jQuery(window).width() < 768) {
           var expand = '<span class="expand"><a class="action-expand"></a></span>';
            jQuery('.navbar-collapse .menu-item-has-children').append(expand);
            jQuery(".menu-item-has-children .expand a").click(function() {
                jQuery(this).parent().parent().find(' > ul').toggle();
                jQuery(this).toggleClass("show-menu");
            });
        }

        //Begin: Sticky Head
        jQuery(function(){
           if (jQuery('body').hasClass('is_nav_sticky')) {
                jQuery(window).resize(function() {
                    if (jQuery(window).width() <= 768) {
                    } else {
                        jQuery("#ibid-main-head").sticky({
                            topSpacing:0
                        });
                    }
                });

                if (jQuery(window).width() >= 768) {
                    jQuery("#ibid-main-head").sticky({
                        topSpacing:0
                    });
                }
           }
        });



        //End: Sticky Head
        jQuery('.cart-contents').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery('.header_mini_cart').addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery('.header_mini_cart').removeClass('visible_cart');
        });
        
        jQuery('.shop_cart').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery('.header_mini_cart').addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery('.header_mini_cart').removeClass('visible_cart');
        });

        jQuery('.header_mini_cart').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery(this).addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery(this).removeClass('visible_cart');
        });


        if ( jQuery( ".woocommerce_categories" ).length ) {
            
            jQuery(".category a").click(function () {
                var attr = jQuery(this).attr("class");

                jQuery(".products_by_category").removeClass("active");
                jQuery(attr).addClass("active");

                jQuery('.category').removeClass("active");
                jQuery(this).parent('.category').addClass("active");

            });  

            jQuery('.products_category .products_by_category:first').addClass("active");
            jQuery('.categories_shortcode .category:first').addClass("active");

        }


        //Begin: Search Form
        if ( jQuery( "#ibid-search" ).length ) {
            new UISearch( document.getElementById( 'ibid-search' ) );
        }
        //End: Search Form

        //Begin: WooCommerce Quantity
        jQuery( function( $ ) {
        if ( ! String.prototype.getDecimals ) {
            String.prototype.getDecimals = function() {
                var num = this,
                    match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if ( ! match ) {
                    return 0;
                }
                return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
            }
        }
        // Quantity "plus" and "minus" buttons
        $( document.body ).on( 'click', '.plus, .minus', function() {
            var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                currentVal  = parseFloat( $qty.val() ),
                max         = parseFloat( $qty.attr( 'max' ) ),
                min         = parseFloat( $qty.attr( 'min' ) ),
                step        = $qty.attr( 'step' );

            // Format values
            if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
            if ( max === '' || max === 'NaN' ) max = '';
            if ( min === '' || min === 'NaN' ) min = 0;
            if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

            // Change the value
            if ( $( this ).is( '.plus' ) ) {
                if ( max && ( currentVal >= max ) ) {
                    $qty.val( max );
                } else {
                    $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                }
            } else {
                if ( min && ( currentVal <= min ) ) {
                    $qty.val( min );
                } else if ( currentVal > 0 ) {
                    $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                }
            }

            // Trigger change event
            $qty.trigger( 'change' );
            });
        });
         //End: WooCommerce Quantity


        //Begin: Flat icons

        if (jQuery('body[class*=skin_]').length){
            var skin_color       = jQuery('body[class*=skin_]').attr('class').split(' ');
            var skin_color_class = skin_color.filter(  function(elem){ return elem.match(/skin_*/) } ).join('');
            var skin_color_hexa  = skin_color_class.replace("skin_", "#");

            jQuery(".flat-icon").flatshadow({
              fade: false,
              color: skin_color_hexa,
              boxShadow: "#00ADF1"
            });
        }
        //End: Flat icons


        //Begin: Parallax
        jQuery('.parralax-background').parallax("50%", 0.5);
        //End: Parallax


        /*Begin: Testimonials slider*/
        jQuery(".testimonials-container").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  2],
                [1200,  2],
                [1400,  2],
                [1600,  2]
            ]
        });
        jQuery(".testimonials-container-1").owlCarousel({
            navigation      : false, // Show next and prev buttons
            navigationText  : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   1],
                [700,   1],
                [1000,  1],
                [1200,  1],
                [1400,  1],
                [1600,  1]
            ]
        });
        jQuery(".testimonials-container-2").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  2],
                [1200,  2],
                [1400,  2],
                [1600,  2]
            ]
        });
        jQuery(".testimonials-container-3").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  3],
                [1200,  3],
                [1400,  3],
                [1600,  3]
            ]
        });
        /*End: Testimonials slider*/


        /*Begin: Clients slider*/
        jQuery(".categories_shortcode").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
            itemsCustom : [
                [0,     1],
                [450,   2],
                [600,   2],
                [700,   5],
                [1000,  5],
                [1200,  5],
                [1400,  5],
                [1600,  5]
            ]
        });

        /*Begin: Portfolio single slider*/
        jQuery(".portfolio_thumbnails_slider").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["",""],
            singleItem      : true
        });
        /*End: Portfolio single slider*/

        /*Begin: Testimonials slider*/
        jQuery(".post_thumbnails_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
        var owl = jQuery(".post_thumbnails_slider");
        jQuery(".next").click(function(){
            owl.trigger('owl.next');
        })
        jQuery(".prev").click(function(){
            owl.trigger('owl.prev');
        })
        /*End: Testimonials slider*/
        
        /*Begin: Testimonials slider*/
        jQuery(".testimonials_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
        /*End: Testimonials slider*/

        /* Animate */
        jQuery('.animateIn').animateIn();

        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            //grab the "back to top" link
            $back_to_top = jQuery('.back-to-top');

        //hide or show the "back to top" link
        jQuery(window).scroll(function(){
            ( jQuery(this).scrollTop() > offset ) ? $back_to_top.addClass('ibid-is-visible') : $back_to_top.removeClass('ibid-is-visible ibid-fade-out');
            if( jQuery(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('ibid-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, scroll_top_duration
            );
        });

        //Begin: Skills
        jQuery('.statistics').appear(function() {
            jQuery('.percentage').each(function(){
                var dataperc = jQuery(this).attr('data-perc');
                jQuery(this).find('.skill-count').delay(6000).countTo({
                    from: 0,
                    to: dataperc,
                    speed: 5000,
                    refreshInterval: 100
                });
            });
        });  
        //End: Skills 

    });
    
     /*LOGIN MODAL */
    var ModalEffects = (function() {
            function init_modal() {

                var overlay = document.querySelector( '.modeltheme-overlay' );

                [].slice.call( document.querySelectorAll( '.modeltheme-trigger' ) ).forEach( function( el, i ) {

                    var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                        close = modal.querySelector( '.modeltheme-close' );

                    function removeModal( hasPerspective ) {
                        classie.remove( modal, 'modeltheme-show' );

                        if( hasPerspective ) {
                            classie.remove( document.documentElement, 'modeltheme-perspective' );
                        }
                    }

                    function removeModalHandler() {
                        removeModal( classie.has( el, 'modeltheme-setperspective' ) ); 
                    }

                    el.addEventListener( 'click', function( ev ) {
                        classie.add( modal, 'modeltheme-show' );
                        overlay.removeEventListener( 'click', removeModalHandler );
                        overlay.addEventListener( 'click', removeModalHandler );

                        if( classie.has( el, 'modeltheme-setperspective' ) ) {
                            setTimeout( function() {
                                classie.add( document.documentElement, 'modeltheme-perspective' );
                            }, 25 );
                        }
                    });

                } );

            }

        if (!jQuery("body").hasClass("login-register-page")) {
            init_modal();
        }

    })();

    jQuery("#dropdown-user-profile").on("hover", function(e){
      if(jQuery(this).hasClass("open")) {
        jQuery(this).removeClass("open");
      } else {
        jQuery(this).addClass("open");
      }
    });    

    jQuery("#member_hover").on("hover", function(e){
      if(jQuery(this).hasClass("open")) {
        jQuery(this).removeClass("open");
      } else {
        jQuery(this).addClass("open");
      }
    });


      jQuery("#modal-log-in #register-modal").on("click",function(){                       
        jQuery("#login-modal-content").fadeOut("fast", function(){
           jQuery("#signup-modal-content").fadeIn(500);
        });
    }); 

    jQuery("#login-content-shortcode .btn-register-shortcode").on("click",function(){                       
        jQuery("#login-content-shortcode").fadeOut("fast", function(){
           jQuery("#register-content-shortcode").fadeIn(500);
        });
    });    

    jQuery('#nav-menu-login').on("click",function(){ 
        jQuery(".modeltheme-show ~ .modeltheme-overlay").on("click",function(){ 
            jQuery("#signup-modal-content").fadeOut("fast");
            jQuery("#login-modal-content").fadeIn(500);
        });
    });

    var baseUrl = document.location.origin;
    if ($(window).width() < 768) { 
        jQuery("#dropdown-user-profile").on("click", function() {
            window.location.href = (baseUrl + '/my-account');
        });
    } 
    
    if( jQuery( '#yith-wcwl-popup-message' ).length == 0 ) {
        var message_div = jQuery( '<div>' )
                .attr( 'id', 'yith-wcwl-message' ),
            popup_div = jQuery( '<div>' )
                .attr( 'id', 'yith-wcwl-popup-message' )
                .html( message_div )
                .hide();

        jQuery( 'body' ).prepend( popup_div );
    }

    (function ($) {
        var openBtn = $('.bot_cat_button'),
        slideMenu = $('.bot_nav_cat_wrap'),
        headerBotClass = $('#navbar');
        
        if (jQuery(window).width() > 1024) {
            if (slideMenu.hasClass("cat_open_default")) {
                openBtn.addClass("active");
                slideMenu.addClass("active");
                slideMenu.slideDown(300);
            }
        } else {
            slideMenu.slideUp(0);
            openBtn.removeClass("active");
            slideMenu.removeClass("active");
        }

        openBtn.on("click", function() {
            if (slideMenu.is(':hidden')) {
                slideMenu.slideDown(300);
                openBtn.addClass("active");
                openBtn.removeClass("close");
            } else {
                slideMenu.slideUp(300);
                openBtn.removeClass("active");
                openBtn.addClass("close");
                slideMenu.removeClass("active");
            }
        });
       
    })(jQuery);

} (jQuery) )