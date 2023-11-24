import $ from "jquery";

$(document).ready(function() {
    $('.image-input').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            $(this).siblings('.preview-image').attr('src', imageUrl);
            $(this).siblings('.delete-image').show();
            $(this).siblings('label').hide();

        }
    });

    $('.delete-image').click(function() {
        $(this).siblings('.preview-image').attr('src', '');
        $(this).siblings('.preview-image').attr('data-is-deleted', true);
        $(this).siblings('.image-input').val('');
        $(this).siblings('label').show();
        $(this).hide();
    });
});
