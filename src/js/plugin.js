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

    $('#demo').pagination({
        dataSource: [1, 2, 3, 4, 5, 6, 7],
        callback: function(data, pagination) {
        // template method of yourself
            var html = '<div>';
            $('#demo-container').html(html);
        }
    })
});