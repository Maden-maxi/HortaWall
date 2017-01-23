"use strict";

jQuery(document).ready(function ($) {
    console.log('Scripts app.js');
    console.time("app");
    setInterval(function () {
        var $grid = $(".grid-results").masonry({
            itemSelector: ".card_square",
            fitWidth: true,
            percentPosition: true
        });
    }, 100);
    $("#date").datepicker();

    $(document).on('click', '.language', function (e) {
        var self = $(this),
            ul = self.parent(),
            btn = ul.prev(),
            btnImg = btn.find('li');
        btn.prepend(self);
        ul.prepend(btnImg);
    });
    console.timeEnd("app");
});