"use strict";
jQuery( document ).ready( function ( $ ) {

//for Preloader

    $( window ).load( function () {
        $( "#loading" ).fadeOut( 500 );
    } );


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $( '.link' ).find( 'a[href*=#]:not([href=#])' ).click( function () {
        if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
            var target = $( this.hash );
            target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
            if ( target.length ) {
                $( 'html,body' ).animate( {
                    scrollTop: ( target.offset().top - 80 )
                }, 1000 );
                if ( $( '.navbar-toggle' ).css( 'display' ) != 'none' ) {
                    $( this ).parents( '.container' ).find( ".navbar-toggle" ).trigger( "click" );
                }
                return false;
            }
        }
    } );



    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW( {
        mobile: false // trigger animations on mobile devices (default is true)
    } );
    wow.init();

// magnificPopup

    $( '.popup-img' ).magnificPopup( {
        type: 'image',
        gallery: {
            enabled: true
        }
    } );

    $( '.video-link' ).magnificPopup( {
        type: 'iframe'
    } );


    $( '.mouse-scroll' ).bind( 'click', function () {
        $( 'html , body' ).stop().animate( {
            scrollTop: $( $( this ).attr( 'href' ) ).offset().top - 60
        }, 1500, 'easeInOutExpo' );
        event.preventDefault();
    } );

    // 為專業領域卡片添加滑鼠跟隨效果
    $(document).ready(function() {
        // 滑鼠跟隨效果
        $('.choose_list_item').each(function() {
            $(this).on('mousemove', function(e) {
                const card = $(this);
                const circle = card.find('.hover-circle');
                
                // 獲取卡片位置
                const cardOffset = card.offset();
                
                // 計算滑鼠在卡片內的相對位置
                const mouseX = e.pageX - cardOffset.left;
                const mouseY = e.pageY - cardOffset.top;
                
                // 設置光暈位置
                circle.css({
                    'opacity': 1,
                    'left': mouseX + 'px',
                    'top': mouseY + 'px'
                });
            });
            
            $(this).on('mouseleave', function() {
                const circle = $(this).find('.hover-circle');
                circle.css('opacity', 0);
            });
        });
        
        // 卡片進入視口時添加動畫效果
        $('.choose_list_item').each(function(index) {
            $(this).addClass('wow fadeInRight');
            $(this).attr('data-wow-delay', (0.2 + index * 0.2) + 's');
        });
    });

} );













