import hashlib
import os
import random
import re
import time
from typing import List, Tuple, Optional, Dict, Any

import transliterate
from flask import Request

from backend.app import db_service
from backend.app.db_service import PhotoInfo

# noinspection PyTypeChecker
base_url_static_image: str = os.getenv("UPLOAD_IMAGES_PATH")
sub_base_url_index_path = "index_image"
sub_base_url_object_path = "object_image"
sub_base_url_adds_images = "additional_images"


def upload_main_data(request: Request):
    save_or_delete_info(request)
    rename_file_info(request)

    return {"message": "Images uploaded and saved successfully"}, 200


def save_or_delete_info(request):
    print("FILE_SERVICE:::Начали выполнение метода save_or_delete_info")
    object_id: Optional[int] = int(request.form.get('id')) if request.form.get('id') else None
    object_from_db = db_service.get_single_object(object_id) if object_id else None
    additional_images_from_db: Optional[List[PhotoInfo]] = db_service.get_object_info(object_id) if object_id else None
    print(f"FILE_SERVICE:::Вносим изменения для существующего объекта:{object_id}: {object_from_db.get('name')}")

    index_image_delete = (request.form.get('index_image_delete') == 'true'
                          and object_from_db.get('index_photo_path') is not None)
    other_image_delete = (request.form.get('object_image_delete') == 'true'
                          and object_from_db.get('object_photo_path') is not None)
    additional_images_id_delete: List[str] = request.form.getlist('additional_images_delete')

    new_object_from_db = object_from_db.copy()

    try:
        if index_image_delete and object_from_db:
            remove_file_if_exists(
                os.path.join(base_url_static_image, sub_base_url_index_path, object_from_db['index_photo_path']),
                "FILE_SERVICE:::Удаление главного изображения не возможно")
            del new_object_from_db['index_photo_path']
        if other_image_delete and object_from_db:
            remove_file_if_exists(
                os.path.join(base_url_static_image, sub_base_url_object_path, object_from_db['object_photo_path']),
                "FILE_SERVICE:::Удаление дополнительного изображения не возможно")
            del new_object_from_db['object_photo_path']

        db_service.delete_photos_by_ids(additional_images_id_delete)
        remove_additional_image(additional_images_from_db, additional_images_id_delete)

        index_image = request.files.get('index_image')
        other_image = request.files.get('object_image')
        additional_images = request.files.getlist('additional_images')

        if index_image:
            new_object_from_db['index_photo_path'] = save_image(
                index_image,
                object_id,
                object_from_db.get('name'),
                sub_base_url_index_path,
                'main',
                object_from_db.get('index_photo_path') if object_from_db else None
            )

        if other_image:
            new_object_from_db['object_photo_path'] = save_image(
                other_image,
                object_id,
                object_from_db.get('name'),
                sub_base_url_object_path,
                'object',
                object_from_db.get('object_photo_path') if object_from_db else None
            )

        if object_id:
            db_service.update_info_object(new_object_from_db.get('index_photo_path'),
                                          new_object_from_db.get('object_photo_path'),
                                          new_object_from_db.get('name'),
                                          object_id)

        for img in additional_images:
            suffix = random_hash()
            save_additional_image_db(img, object_from_db.get('name'), suffix, object_id)
            save_additional_image_directory(img, object_from_db.get('name'), suffix, object_id)
    except Exception as e:
        print(e)  # В реальной жизни используйте модуль logging
        return {"error": "Internal Server Error"}, 500


def rename_file_info(request):
    print("FILE_SERVICE:::Начали выполнение метода rename_file_info")
    object_id: Optional[int] = int(request.form.get('id'))
    object_from_db = db_service.get_single_object(object_id) if object_id else None
    object_name = request.form.get('object_name')
    rename_flag = object_from_db and object_name != object_from_db['name']
    if not rename_flag:
        return
    print(f"FILE_SERVICE:::Переименовываем объект с id: {object_id}\n"
          f"{object_from_db.get('name')} --> {object_name} и связанные с ним изображения")

    new_object_from_db = object_from_db.copy()
    new_object_from_db.update(name=object_name)

    try:
        additional_images_from_db = db_service.get_object_info(object_id) if object_id else None

        if object_id:
            new_object_from_db['index_photo_path'] = rename_image(
                object_id,
                object_name,
                sub_base_url_index_path,
                'main',
                object_from_db.get('index_photo_path') if object_from_db else None
            )
            new_object_from_db['object_photo_path'] = rename_image(
                object_id,
                object_name,
                sub_base_url_object_path,
                'object',
                object_from_db.get('object_photo_path') if object_from_db else None)

            db_service.update_info_object(new_object_from_db.get('index_photo_path'),
                                          new_object_from_db.get('object_photo_path'),
                                          new_object_from_db.get('name'),
                                          object_id)

            if additional_images_from_db:
                photo_updates = []
                for image in additional_images_from_db:
                    old_short_url_add_image = os.path.normpath(image['path'])
                    image['path'] = old_short_url_add_image
                    extension = os.path.splitext(old_short_url_add_image)[1].lstrip('.')
                    new_short_url_add_image = make_short_url_for_add_image(object_name, random_hash(), extension,
                                                                           object_id)
                    photo_updates.append((old_short_url_add_image, new_short_url_add_image))
                rename_additional_images(photo_updates)
                update_additional_urls_images_db(additional_images_from_db, photo_updates)

    except Exception as e:
        print("FILE_SERVICE:::" + str(e))  # В реальной жизни используйте модуль logging
        return {"error": "Internal Server Error"}, 500


def make_short_url_for_add_image(object_name_ru, postfix, extension, object_id):
    translit_name = translit_and_clean(object_name_ru)
    name_file = f"{postfix}_{translit_name}.{extension}"
    name_directory = f"{object_id}_{translit_and_clean(object_name_ru)}"
    return os.path.join(name_directory, name_file)


def get_absolute_path(images_path, path):
    # Если путь уже абсолютный, возвращаем его как есть
    if os.path.isabs(path):
        return path

    # Если путь относительный, строим абсолютный путь
    # с использованием images_path как базовой директории
    images_path = images_path or os.getcwd()  # Если UPLOAD_IMAGES_PATH не установлен, используем текущую директорию
    absolute_path = os.path.join(images_path, path)
    absolute_path = os.path.abspath(absolute_path)  # Преобразуем в абсолютный путь
    return absolute_path


def remove_file_if_exists(path_to_delete: str, message=f'Удаления изображения невозможно'):
    try:
        if os.path.exists(path_to_delete):
            os.remove(path_to_delete)
            print(f"FILE_SERVICE:::Файл по пути {path_to_delete} успешно удален")

        if sub_base_url_adds_images in path_to_delete:
            _remove_empty_dir(path_to_delete)

    except FileNotFoundError:
        print(f"{message}: Файла по пути {path_to_delete} не существует")


def generate_image_path(object_id, object_name_ru, sub_base_url, suffix, old_name_from_db, image=None):
    new_filename = f"{object_id}_{translit_and_clean(object_name_ru)}_{suffix}"
    extension = os.path.splitext(image.filename if image else old_name_from_db)[1].lstrip('.')
    short_url = os.path.join(sub_base_url, f"{new_filename}.{extension}")
    new_full_url = os.path.join(base_url_static_image, short_url)
    return new_full_url, f"{new_filename}.{extension}"


def save_image(image, object_id, object_name_ru, sub_base_url, suffix, old_name_from_db):
    new_full_url, _ = generate_image_path(object_id, object_name_ru, sub_base_url, suffix, old_name_from_db, image)
    if image:
        image.save(new_full_url)
        print(f"FILE_SERVICE:::Изображение с object_id: {object_id} по пути {new_full_url} сохранено")
    return os.path.basename(new_full_url)


def rename_image(object_id, object_name_ru, sub_base_url, suffix, old_name_from_db):
    new_full_url, new_short_url = generate_image_path(object_id, object_name_ru, sub_base_url, suffix, old_name_from_db)
    old_full_url = os.path.join(base_url_static_image, sub_base_url, old_name_from_db)
    rename(old_full_url, new_full_url)
    print(f"FILE_SERVICE:::Изображение с object_id: {object_id} переименовано с {old_full_url} на {new_full_url}")
    return new_short_url


def remove_additional_image(photo_infos: List[PhotoInfo], delete_ids: List[Any]):
    for photo_info in photo_infos:
        if str(photo_info["id"]) not in delete_ids:
            continue
        full_url_add_photo = os.path.join(base_url_static_image, sub_base_url_adds_images, photo_info["path"])
        remove_file_if_exists(full_url_add_photo)


def rename_additional_images(photo_updates):
    for photo_update in photo_updates:
        old_path, new_path = photo_update
        old_path = os.path.join(base_url_static_image, sub_base_url_adds_images, old_path)
        new_path = os.path.join(base_url_static_image, sub_base_url_adds_images, new_path)
        rename(old_path, new_path)


def update_additional_urls_images_db(additional_images_from_db: List[PhotoInfo],
                                     photo_updates: List[Tuple[str, str]]) -> None:
    dicts_id_new_urls: Dict[int, str] = {}
    dicts_old_new_urls: Dict[str: str] = {el[0]: el[1] for el in photo_updates}
    for photo_info in additional_images_from_db:
        dicts_id_new_urls[photo_info['id']] = dicts_old_new_urls.get(photo_info['path'])
    db_service.update_photo_paths(dicts_id_new_urls)


def save_additional_image_directory(image, object_name_ru, index, object_id):
    extension = os.path.splitext(image.filename)[1].lstrip('.')
    short_url = make_short_url_for_add_image(object_name_ru, index, extension, object_id)
    full_url = os.path.join(base_url_static_image, sub_base_url_adds_images, short_url)
    original_new_path = full_url
    os.makedirs(os.path.dirname(full_url), exist_ok=True)
    while os.path.exists(full_url):
        # Генерируем случайное число и добавляем его к имени файла
        random_number = random.randint(0, 0xFFFF)
        base, extension = os.path.splitext(original_new_path)
        full_url = f"{base}_{format(random_number, 'x')}{extension}"
    image.save(full_url)


def save_additional_image_db(image, object_name_ru, index, object_id) -> int:
    extension = os.path.splitext(image.filename)[1].lstrip('.')
    short_url = make_short_url_for_add_image(object_name_ru, index, extension, object_id)
    return db_service.insert_photo(short_url, object_id)


def rename(old_path, new_path):
    # Проверяем, существует ли исходный файл
    if not os.path.exists(old_path):
        print(f"FILES_SERVICE:::Файл {old_path} не найден.")
        return False

    # Проверяем, существует ли файл по новому пути
    original_new_path = new_path
    while os.path.exists(new_path):
        # Генерируем случайное число и добавляем его к имени файла
        random_number = random.randint(0, 0xFFFF)
        base, extension = os.path.splitext(original_new_path)
        new_path = f"{base}_{format(random_number, 'x')}{extension}"

    # Создаем директории для нового пути, если они еще не существуют
    new_dir = os.path.dirname(new_path)
    os.makedirs(new_dir, exist_ok=True)

    # Переименовываем или перемещаем файл
    try:
        os.rename(old_path, new_path)
        _remove_empty_dir(old_path)
        print(f"FILES_SERVICE:::Файл {old_path} был успешно переименован/перемещен в {new_path}")
        return True
    except OSError as e:
        print(f"FILE_SERVICE:::Ошибка при переименовании файла: {e}")
        return False


def _remove_empty_dir(any_path: str):
    if len(os.listdir(os.path.dirname(any_path))) == 0:
        os.rmdir(os.path.dirname(any_path))
        print(f"FILE_SERVICE:::Пустая директория{os.path.dirname(any_path)} удалена")


def random_hash(_len=5):
    random_number = random.randint(1, 1_000_000_000)

    # Вычисление хэша от текущего времени
    hash_object = hashlib.sha256(str(random_number).encode())
    hex_dig = hash_object.hexdigest()

    # Взятие первых 5 символов из хэша
    short_hash = hex_dig[:_len]

    return short_hash


def translit_and_clean(str) -> str:
    translit_str = transliterate.translit(str, reversed=True).replace(' ', '_')
    return re.sub(r'[^\w.]', '', translit_str)
