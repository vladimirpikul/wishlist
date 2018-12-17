$(document).ready(function(){
    $('.store-features').slick({
        pauseOnFocus: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});