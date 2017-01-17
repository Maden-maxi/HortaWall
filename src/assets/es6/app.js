$(function () {
    $( "#year" ).slider({
        formatter: (value) => {
            $("label .year").text(value);
            return `Current value: ${value}`;
        }
    });

    $("#date").datepicker();
    console.log('Scripts app.js');
    $("#carousel-imgs").on('slide.bs.carousel', function (e) {
       /* console.log($('#carousel-imgs .item.active').index());*/
        var infoCarousel = $("#info-carousel");
        if( e.direction == 'left' )
            infoCarousel.carousel('next');
        else
            infoCarousel.carousel('prev');
    });

    $(".grid-results").masonry({
        itemSelector: ".card"
    });

    var activeLangIndex;

    $(document).on('click' , '.language', function (e) {
        var self = $(this),
            ul = self.parent(),
            btn = ul.prev(),
            btnImg = btn.find('li');
        btn.prepend(self);
        ul.prepend(btnImg);
    });
});