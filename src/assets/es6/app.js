jQuery(document).ready(function ($) {
    console.log('Scripts app.js');

    // Masonty Grid
    setInterval(function () {
        let $grid = $(".grid-results").masonry({
            itemSelector: ".card_square",
            fitWidth: true,
            percentPosition: true
        });
    }, 100);
    $('[data-provide="datepicker"]').datepicker({
        format: "dd/mm/yyyy"
    });

    //Switch lang
    $(document).on('click' , '.language', function (e) {
        let self = $(this),
          ul = self.parent(),
          btn = ul.prev(),
          btnImg = btn.find('li');
        btn.prepend(self);
        ul.prepend(btnImg);
    });

    // Side nav
    $(document).on('click', '#open-sidenav', function (e) {
        e.preventDefault();
        $('#sidenav').css('width', '250px');
        $('#main').addClass('disabled');
        $('.overlay').fadeIn();
    });

    $(document).on('click', '.closebtn, .overlay', function (e) {
        e.preventDefault();
        $('#sidenav').css('width', '0');
        $('#main').removeClass('disabled');
        $('.overlay').fadeOut();
    });

    $(document).on('click', '[name="image"]', function (event) {
        console.log(event);
    });

    // Upload Image

    function maskImgs() {
        //$('.img-wrapper img').imagesLoaded({}, function() {
        $.each($('.img-wrapper img'), function(index, img) {
            let src = $(img).attr('src');
            let parent = $(img).parent();
            parent
                .css('background', 'url(' + src + ') no-repeat center center')
                .css('background-size', 'cover');
            $(img).remove();
        });
        //});
    }

    let preview = {
        init: function() {
            preview.setPreviewImg();
            preview.listenInput();
        },
        setPreviewImg: function(fileInput) {
            let path = $(fileInput).val();
            let uploadText = $(fileInput).siblings('.file-upload-text');

            if (!path) {
                $(uploadText).val('');
            } else {
                path = path.replace(/^C:\\fakepath\\/, "");
                $(uploadText).val(path);

                preview.showPreview(fileInput, path, uploadText);
            }
        },
        showPreview: function(fileInput, path, uploadText) {
            let file = $(fileInput)[0].files;

            if (file && file[0]) {
                let reader = new FileReader();

                reader.onload = function(e) {
                    let previewImg = $(fileInput).parents('.file-upload-wrapper').siblings('.preview');
                    let img = $(previewImg).find('img');

                    if (img.length == 0) {
                        $(previewImg).html('<img src="' + e.target.result + '" alt=""/>');
                    } else {
                        img.attr('src', e.target.result);
                    }
                    console.log(e);
                    uploadText.val(path);
                    maskImgs();
                };

                reader.onloadstart = function() {
                    $(uploadText).val('uploading..');
                };

                reader.readAsDataURL(file[0]);
            }
        },
        listenInput: function() {
            $('.file-upload-native').on('change', function() {
                preview.setPreviewImg(this);
            });
        }
    };
    preview.init();

    // autocomplete

    $('.autocomplite[name="hometown"], .autocomplite-cities').bootcomplete({
        url: 'assets/dump-data/cities.json',
        method: 'GET'
    });

    $('.autocomplite[name="nationality"], .autocomplite-countries').bootcomplete({
        url: 'assets/dump-data/countries.json',
        method: 'GET'
    });

    // Crop image
    $(document).on('click', '#add_person_modal', function (event) {
        event.preventDefault();
        let $this = $(this);
        let modal = $this.closest('.modal-person');
        let avatar = modal.find('.preview.img-wrapper');
        let fullname = $('#fullname');
        let nationality = $('#nationality');
        let postition = $('#position');
        let person = {
            avatar: modal.find('.preview.img-wrapper').attr('style'),
            fullname: fullname.val(),
            nationality: nationality.val(),
            position: postition.val()
        };
        modal.modal('hide');
        console.log(person);
        $('#team').append(`
            <div class="form-group person">
                <label class="col-xs-12 col-md-3 control-label">
                    <div class="preview img-wrapper" style='${person.avatar}'></div>
                </label>
                <div class="col-xs-12 col-md-6">
                    <h4>${person.fullname}</h4>
                    <h4 class="nationality">${person.nationality}</h4>
                    <h5 class="pos">${person.position}</h5>
                    <button class="btn btn-danger remove-person">&times;</button>
                </div>
                
            </div>
        `);

        avatar.attr('style', '');
        fullname.val('');
        nationality.val('');
        postition.val('');

    });
    $(document).on('click', '.remove-person', function (event) {
       event.preventDefault();
       let person = $(this).closest('.person');
       person.slideUp('600', function () {
           setTimeout(function () {
               person.remove()
           }, 600);

       });

    });


});
