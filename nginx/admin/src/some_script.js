import $ from "jquery";

$(document).ready(function() {
    $('.image-input').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            $(this).siblings('.preview-image').attr('src', imageUrl);
            $(this).siblings('.delete-image').show();
        }
    });

    $('.delete-image').click(function() {
        $(this).siblings('.preview-image').attr('src', '');
        $(this).siblings('.image-input').val('');
        $(this).hide();
    });
});

// $(document).ready(function() {
//     $('#add-additional-image').on('click', function() {
//         // Добавляем новый элемент ввода файлов и превью
//         const newImageInput = $('<input/>', {
//             type: 'file',
//             class: 'image-input additional',
//             accept: 'image/*'
//         });
//
//         const newImagePreview = $('<img/>', {
//             src: '',
//             class: 'additional-image-preview',
//             alt: 'Additional Image'
//         });
//
//         const deleteButton = $('<button/>', {
//             class: 'delete-image',
//             text: '-'
//         }).css('display', 'none');
//
//         // Добавляем обработчики событий для нового ввода
//         newImageInput.on('change', function() {
//             const file = this.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     newImagePreview.attr('src', e.target.result);
//                     deleteButton.show();
//                 }
//                 reader.readAsDataURL(file);
//             }
//         });
//
//         deleteButton.on('click', function() {
//             newImagePreview.attr('src', '');
//             newImageInput.val('');
//             deleteButton.hide();
//         });
//
//         // Добавляем новые элементы в DOM
//         $('#additional-images').append(newImageInput, newImagePreview, deleteButton);
//     });
// });
