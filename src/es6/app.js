jQuery(document).ready(function ($) {
    $("#year").slider({
        formatter: value => `Current value: ${value}`
    });
});