import './styles.css';
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import {getAllObjects, getAllPriority, getContentInfo, getObjectInfo} from "./service/restService";
import './some_script.js'


getAllObjects().then(data => {
    let options: OptionType[] = [];
    data.forEach((newOption: OptionType) => {
        options.push(newOption);
    })
    fillSelect(options);

    // Запускаем событие change для object-select
    $('#object-select').trigger('change');
})



getContentInfo('about').then((data : any) => {
   $('#about-text').val(data.block_data)
})

getContentInfo('contacts').then((data : any) => {
    $('#contacts-text').val(data.block_data)
})



type OptionType = {
    id: number;
    name: string;
    description:string;
    index_photo_path:string;
    object_photo_path:string;
};

$('#object-select').on('change',function() {
    getAllObjects().then(data => {
        const selectedOption = $(this).find('option:selected');
        let options: OptionType[] = [];
        data.forEach((newOption: OptionType) => {
            options.push(newOption);
        })
        fillSelect(options);
        $('#object-select').val(selectedOption.val());

        let base_path_img: string = '../../static_images/'
        const description = selectedOption.data('description');
        const indexPhotoPath = base_path_img  + selectedOption.data('index-photo-path');
        const objectPhotoPath = base_path_img + selectedOption.data('object-photo-path');

        // Теперь вы можете использовать description, indexPhotoPath и objectPhotoPath для обновления других полей.
        $('#object-name').val(selectedOption.text());
        $('#object-description').val(description);

        $('#index-photo').attr('src', indexPhotoPath);
        $('#object-photo').attr('src', objectPhotoPath);
        getObjectInfo(selectedOption.val() as number).then((data: any) => {
            // Очистка контейнера дополнительных изображений
            $('#additional-images').empty();

            data.forEach(el => {
                let objImgPath = base_path_img + el.path;

                // Создаем обертку для изображения и кнопки
                const imageWrapper = $('<div/>', {
                    class: 'additional-image-preview', // применяем стиль к обертке
                });

                const newImagePreview = $('<img/>', {
                    src: objImgPath,
                    alt: 'Additional Image'
                }).css({
                    width: '100%',  // чтобы изображение заполняло всю ширину обертки
                    height: '100%'
                });

                const deleteButton = $('<button/>', {
                    class: 'delete-image',
                    text: '-'
                });

                deleteButton.on('click', function() {
                    // Удаляем обертку при клике
                    imageWrapper.remove();
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

$('#add-additional-image').on('click', function() {
    $('#image-upload-input').click();
});
$("#additional-images").sortable();
$('#image-upload-input').on('change', function() {
    const file = (this as HTMLInputElement).files?.[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
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

                deleteButton.on('click', function() {
                    imageWrapper.remove();
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

    if(imgSrc) {
        // Показать кнопку удаления, если путь к изображению присутствует
        deleteButton.show();
    } else {
        // Скрыть кнопку удаления, если пути к изображению нет
        deleteButton.hide();
    }
}

function fillSelect(options) {
    const $select = $('#object-select');

    // Очистка текущих опций
    $select.empty();

    // Добавление новых опций
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

$('#delete-object-btn').on('click', function () {
    const isConfirmed = confirm('Вы хотите удалить объект? Все фотографии и информация о нем будут удалены с сервера.');

    if (isConfirmed) {
        // Получаем ID выбранного объекта
        const selectedObjectId = $('#object-select').val();

        // Выполните запрос на удаление объекта на сервере
        // ...

        // Затем обновите список объектов
        getAllObjects().then(data => {
            let options = [];
            data.forEach((newOption) => {
                options.push(newOption);
            });

            fillSelect(options);

            // Если вы хотите обновить интерфейс пользователя или скрыть определенные элементы, вы можете сделать это здесь
            // Например, сбросить поля формы или обновить изображения
            // ...

            alert('Объект был удален');
        });
    }
});


getAllPriority().then(data => {
    const $table: any = $('#objects-table');
    $table.empty(); // Очищаем таблицу перед заполнением
    data.forEach(object => {
        $table.append(`
            <tr data-id="${object.id}">
                <td>${object.name}</td>
                <td><input type="number" value="${object.index_priority}" class="index-priority" min="1" max="${data.length}"></td>
                <td><input type="number" value="${object.object_priority}" class="object-priority" min="1" max="${data.length}"></td>
            </tr>
        `);
    });
})

$('#objects-table').on('change', 'input.index-priority, input.object-priority', function() {
    const $row = $(this).closest('tr');
    const objectId = $row.data('id');
    const indexPriority = $row.find('input.index-priority').val();
    const objectPriority = $row.find('input.object-priority').val();
});


