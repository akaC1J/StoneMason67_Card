import $ from 'jquery';
import {sendFormData, setContentInfo, setImgPriority, setPriority} from "./service/restService";
import {selectedFiles, setToRemoveIdPhoto, updateMainInfo} from './index';

type Priority = {
    id: number;
    index_priority: number;
    object_priority: number;
};

function saveContent(btnSelector: string, textSelector: string, pageId: string): void {
    $(btnSelector).on('click', function () {
        const text = $(textSelector).val() as string;
        setContentInfo({ page_id: pageId, block_data: text })
            .then(() => alert('Успешно сохранено!'))
            .catch(error => {
                console.error(error);
                alert('Произошла ошибка при сохранении!');
            });
    });
}

function collectPriorities(): Priority[] {
    const priorities: Priority[] = [];
    $('#objects-table-index tr[data-id]').each(function () {
        const id = $(this).data('id') as number;
        const indexPriority = parseInt($(this).find('.index-priority').text(), 10);
        const objectPriority = parseInt($('#objects-table-objects tr[data-id="' + id + '"]').find('.object-priority').text(), 10);
        priorities.push({ id, index_priority: indexPriority, object_priority: objectPriority });
    });
    return priorities;
}



saveContent('#save-about-btn', '#about-text', 'about');
saveContent('#save-contacts-btn', '#contacts-text', 'contacts');

$('#save-priority-btn').on('click', function () {
    const priorities = collectPriorities();
    setPriority(priorities)
        .then(() => alert('Успешно сохранено!'))
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при сохранении!');
        });
});

$('#save-object-btn').on('click', function () {
    const formData = new FormData();
    const indexImageElement = $('#index-image')[0] as HTMLInputElement;
    const otherImageElement = $('#other-image')[0] as HTMLInputElement;
    const indexFile = indexImageElement.files?.[0];
    const objectImage = otherImageElement.files?.[0];
    const indexPhoto = $('#index-photo')[0]
    const objectPhoto = $('#object-photo')[0]
    const selectedValueId: string = $('#object-select').val() as string || undefined;
    formData.append("id", selectedValueId);
    formData.append('index_image_delete', indexPhoto.dataset['isDeleted'] || 'false');
    formData.append('object_image_delete', objectPhoto.dataset['isDeleted'] || 'false');
    setToRemoveIdPhoto.forEach((id: number) => {
        formData.append("additional_images_delete", id.toString());
    })
    if (indexFile) formData.append('index_image', indexFile);
    if (objectImage) formData.append('object_image', objectImage);
    selectedFiles.forEach((file: File) => {
        formData.append('additional_images', file);
    });


    formData.append('object_name', $('#object-name').val() as string);

    sendFormData( formData)
        .then(() => alert('Успешно сохранено!'))
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при сохранении!');
        })
        .finally(() => window.location.reload())
});

$('#save-image-priority-btn').on('click', function () {
    const priorities = []
    $('#additional-images-priority img').each(function(index) {
        // Получаем текущий элемент в цикле
        const image = $(this);

        // Получаем атрибут data-priority
        const priority = index + 1;
        const id = image.data('id');
        priorities.push({id, priority})
    });

    setImgPriority(priorities)
        .then(() => alert('Успешно сохранено!'))
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при сохранении!');
        });
});


