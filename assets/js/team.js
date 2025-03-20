// 團隊介紹頁面的 JavaScript

$(document).ready(function() {
    // 初始化 WOW.js 動畫
    new WOW().init();
    
    // 預設為暗黑模式
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
        $('body').addClass('dark-mode').removeClass('light-mode');
    } else {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            $('body').addClass('dark-mode').removeClass('light-mode');
            $('#theme-toggle i').removeClass('fa-moon').addClass('fa-sun');
        } else {
            $('body').addClass('light-mode').removeClass('dark-mode');
            $('#theme-toggle i').removeClass('fa-sun').addClass('fa-moon');
        }
    }

    // 主題切換功能
    $('#theme-toggle').on('click', function(e) {
        e.preventDefault();
        if ($('body').hasClass('dark-mode')) {
            // 切換至亮色模式
            $('body').removeClass('dark-mode').addClass('light-mode');
            $(this).find('i').removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            // 切換至暗色模式
            $('body').removeClass('light-mode').addClass('dark-mode');
            $(this).find('i').removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 平滑滾動效果
    $('a.mouse-scroll').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000, 'easeInOutExpo');
    });

    // 導航欄滾動效果
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.navbar-default').addClass('small');
        } else {
            $('.navbar-default').removeClass('small');
        }
    });

    // 團隊成員卡片動畫效果
    $('.team-member-card').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.2) + 's'
        });
    });

    // 技能進度條動畫
    function animateProgressBars() {
        $('.progress-bar').each(function() {
            var width = $(this).attr('aria-valuenow') + '%';
            $(this).css('width', '0%').animate({
                width: width
            }, 1000);
        });
    }

    // 當滾動到技能區域時觸發進度條動畫
    var skillsOffset = $('.team-skills').offset();
    if (skillsOffset) {
        var skillsTop = skillsOffset.top;
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > (skillsTop - 600)) {
                animateProgressBars();
                // 解除此捲動事件以避免重複觸發
                $(window).off('scroll');
            }
        });
    }

    // 背景粒子效果
    particlesJS("home", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // 側邊選單控制
    $('.side-menu').on('click', function() {
        $('.side').toggleClass('on');
    });
    
    $('.close-side').on('click', function() {
        $('.side').removeClass('on');
    });
}); 