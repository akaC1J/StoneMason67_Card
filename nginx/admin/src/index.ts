import './styles.css';
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import {deleteObjectInfo, getAllObjects, getAllPriority, getContentInfo, getObjectInfo} from "./service/restService";
import './some_script.js'
import './saveButtonHandlers'

let BASE_IMG_URL: string = '../../static_images/'

const authToken = localStorage.getItem('authToken');

if (!authToken) {
    // Если authToken не существует или равен undefined, перенаправляем на login.html
    window.location.href = 'login.html';
}


updateMainInfo()

export function updateMainInfo() {
    getAllObjects().then(data => {
        let options: OptionType[] = [];
        data.forEach((newOption: OptionType) => {
            options.push(newOption);
        })
        fillSelect(options);
        $('#object-select').trigger('change');
        fillAddImgSelect(options)
    })

}


getContentInfo('about').then((data: any) => {
    $('#about-text').val(data.block_data)
})

getContentInfo('contacts').then((data: any) => {
    $('#contacts-text').val(data.block_data)
})


type OptionType = {
    id: number;
    name: string;
    description: string;
    index_photo_path: string;
    object_photo_path: string;
};

$('#object-select').on('change', function () {
    getAllObjects().then(data => {
        const selectedOption = $(this).find('option:selected');
        let options: OptionType[] = [];
        data.forEach((newOption: OptionType) => {
            options.push(newOption);
        })
        fillSelect(options);
        $('#object-select').val(selectedOption.val());


        const description = selectedOption.data('description');

        if (selectedOption.data('index-photo-path')) {
            const indexPhotoPath = BASE_IMG_URL + selectedOption.data('index-photo-path');
            $('#index-photo').attr('src', indexPhotoPath);
            $('label[for="index-image"]').hide();
        } else {
            $('#index-photo').attr('src', null);
            $('label[for="index-image"]').show();
        }

        if (selectedOption.data('object-photo-path')) {
            const objectPhotoPath = BASE_IMG_URL + selectedOption.data('object-photo-path');
            $('#object-photo').attr('src', objectPhotoPath);
            $('label[for="other-image"]').hide();
        } else {
            $('#object-photo').attr('src', null);
            $('label[for="other-image"]').show();
        }

        // Теперь вы можете использовать description, indexPhotoPath и objectPhotoPath для обновления других полей.
        $('#object-name').val(selectedOption.text());
        $('#object-description').val(description);

        getObjectInfo(selectedOption.val() as number).then((data: any) => {
            // Очистка контейнера дополнительных изображений
            $('#additional-images').empty();

            data.forEach(el => {
                let objImgPath = BASE_IMG_URL + el.path;

                // Создаем обертку для изображения и кнопки
                const imageWrapper = $('<div/>', {
                    class: 'additional-image-preview', // применяем стиль к обертке
                });

                const newImagePreview = $('<img/>', {
                    src: objImgPath,
                    alt: 'Additional Image',
                    'data-id': el.id
                }).css({
                    width: '100%',  // чтобы изображение заполняло всю ширину обертки
                    height: '100%'
                });

                const deleteButton = $('<button/>', {
                    class: 'delete-image',
                    text: '-'
                });

                deleteButton.on('click', function () {
                    // Удаляем обертку при клике
                    imageWrapper.remove();
                    let imageId = newImagePreview.data('id');
                    setToRemoveIdPhoto.add(imageId);

                });

                // Добавляем изображение и кнопку в обертку, а обертку в DOM
                imageWrapper.append(newImagePreview, deleteButton);
                $('#additional-images').append(imageWrapper);
            });
        });
        // Проверьте, есть ли изображения, и управляйте видимостью кнопки удаления
        manageDeleteButtonVisibility('#index-photo');
        manageDeleteButtonVisibility('#object-photo');
    })

});

$('#add-additional-image').on('click', function () {
    $('#image-upload-input').click();
});


export let setToRemoveIdPhoto = new Set();
// Этот набор будет хранить все выбранные файлы
export const selectedFiles = new Set();
$('#image-upload-input').on('change', function () {
    const file = (this as HTMLInputElement).files?.[0];

    if (file) {

        selectedFiles.add(file); // Сохраняем файл в набор

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageSrc = e.target?.result;

            if (imageSrc) {
                const imageWrapper = $('<div/>', {
                    class: 'additional-image-preview',
                });

                const newImagePreview = $('<img/>', {
                    src: String(imageSrc),
                    alt: 'Additional Image'
                }).css({
                    width: '100%',
                    height: '100%'
                });

                const deleteButton = $('<button/>', {
                    class: 'delete-image',
                    text: '-'
                });

                deleteButton.on('click', function () {
                    imageWrapper.remove();
                    selectedFiles.delete(file);
                });

                imageWrapper.append(newImagePreview, deleteButton);
                $('#additional-images').append(imageWrapper);
            }
        }

        reader.readAsDataURL(file);
    }
});

$('#create-object-btn').on('click', function () {
    getAllObjects().then(data => {
        let options = [];
        data.forEach((newOption) => {
            options.push(newOption);
        });

        // Добавление нового объекта в список
        const newObject = {
            id: -1, // Устанавливаем ID в null
            name: 'Новый объект',
            description: '',
            index_photo_path: '',
            object_photo_path: ''
        };
        options.push(newObject);

        fillSelect(options);

        // Выбор нового объекта
        $('#object-select').val(newObject.id)
        $('#object-name').val(newObject.name)
        $('#index-photo').attr('src', '');
        $('#object-photo').attr('src', '');
        $('#additional-images').empty();
    });
});

function manageDeleteButtonVisibility(imageSelector) {
    const imgSrc = $(imageSelector).attr('src');
    const deleteButton = $(imageSelector).siblings('.delete-image');

    if (imgSrc) {
        // Показать кнопку удаления, если путь к изображению присутствует
        deleteButton.show();
    } else {
        // Скрыть кнопку удаления, если пути к изображению нет
        deleteButton.hide();
    }
}

function fillAddImgSelect(options) {
    const $select_add_img = $('#object-select-priority');
    $select_add_img.empty();

    options.forEach(option => {
        $select_add_img.append($('<option>', {
            value: option.id,
            text: option.name,
        }));
    });
    $("#additional-images-priority").sortable();
    $('#object-select-priority').trigger('change');
}

function fillSelect(options) {
    const $select = $('#object-select');

    $select.empty();

    options.forEach(option => {
        $select.append($('<option>', {
            value: option.id,
            text: option.name,
            'data-description': option.description,
            'data-index-photo-path': option.index_photo_path,
            'data-object-photo-path': option.object_photo_path
        }));
    });
}

$('#object-select-priority').on('change', function () {
    const selectedOption = $(this).find('option:selected');
    getObjectInfo(selectedOption.val() as number).then((data: any) => {

        // Очистка контейнера дополнительных изображений
        $('#additional-images-priority').empty();

        data.sort((a, b) => a.priority - b.priority);
        data.forEach(el => {
            let objImgPath = BASE_IMG_URL + el.path;

            // Создаем обертку для изображения и кнопки
            const imageWrapper = $('<div/>', {
                class: 'additional-image-preview', // применяем стиль к обертке
            });

            const newImagePreview = $('<img/>', {
                src: objImgPath,
                alt: 'Additional Image',
                'data-id': el.id,
                'data-priority:': el.prioriy
            }).css({
                width: '100%',
                height: '100%'
            });

            imageWrapper.append(newImagePreview);
            $('#additional-images-priority').append(imageWrapper);
        });
    });
})


$('#delete-object-btn').on('click', function () {
    const isConfirmed = confirm('Вы хотите удалить объект? Все фотографии и информация о нем будут удалены с сервера.');

    if (isConfirmed) {
        // Получаем ID выбранного объекта
        const selectedObjectId = Number($('#object-select').val());
        deleteObjectInfo(selectedObjectId).finally(() =>  // Затем обновите список объектов
            getAllObjects().then(data => {
                let options = [];
                data.forEach((newOption) => {
                    options.push(newOption);
                });

                fillSelect(options);
                fillAddImgSelect(options)
                $('#object-select').trigger('change');
                alert('Объект был удален');

            }));
    }
});


getAllPriority().then(data => {
    const $table_index: any = $('#objects-table-index');
    const $table_objects: any = $('#objects-table-objects');
    $table_index.empty(); // Очищаем таблицу перед заполнением
    $table_objects.empty(); // Очищаем таблицу перед заполнением
    $table_index.append(`<tr>
                    <td><b>Имя</b></td>
                    <td><b>"Домой"</b></td>
                </tr>`)
    $table_objects.append(`<tr>
                    <td><b>Имя</b></td>
                    <td><b>"Объекты"</b></td>
                </tr>`)
    data.forEach(object => {
        $table_index.append(`
        <tr data-id="${object.id}">
            <td>${object.name}</td>
            <td><label class="index-priority">${object.index_priority}</label></td>
        </tr>
    `);
        $table_objects.append(`
        <tr data-id="${object.id}">
            <td>${object.name}</td>
            <td><label class="object-priority">${object.object_priority}</label></td>
        </tr>
    `);
    });

    $(".inline-table").sortable({
        items: "tr:not(:first-child)",
        update: function (event, ui) {
            // Пересчет приоритетов после каждого перетаскивания
            $(this).find('tr:not(:first-child)').each(function (index) {
                // Начинаем с 1, так как индексация в JavaScript начинается с 0
                $(this).find('label').text(index + 1);
            });
        }
    }).disableSelection();

})

$('#objects-table').on('change', 'input.index-priority, input.object-priority', function () {
    const $row = $(this).closest('tr');
    const objectId = $row.data('id');
    const indexPriority = $row.find('input.index-priority').val();
    const objectPriority = $row.find('input.object-priority').val();
});