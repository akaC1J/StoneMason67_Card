from typing import Tuple, List, TypedDict, Dict, Optional, Any

import database_engine


class PhotoInfo(TypedDict):
    id: int
    path: str
    object_id: int
    is_visible: bool


class ConstructionObjectInfo(TypedDict):
    id: int
    name: str
    description: str
    index_photo_path: str
    object_photo_path: str


GET_SINGLE_OBJECT_QUERY = 'select * from public.construction_objects where id=%s'
GET_FROM_CONSTRUCTION_OBJECTS_QUERY = 'select * from public.construction_objects order by index_priority'
GET_OBJECT_INFO = 'select * from public.photos where object_id=%s'
GET_CONTENT_INFO = 'select * from public.content_info where page_id=%s'
GET_ALL_PRIORITY = ('select id, name, index_priority, object_priority from public.construction_objects order by '
                    'index_priority')
DELETE_PHOTOS_BY_IDS = 'delete from public.photos where id in %s'
DELETE_OBJECT_INFO_QUERY = 'delete from public.constuction_objects where id in %s'

UPDATE_PRIORITY_QUERY = '''
    UPDATE public.construction_objects
    SET index_priority = %s, object_priority = %s
    WHERE id = %s;
'''

UPDATE_PRIORITY_IMAGES_QUERY = '''
    UPDATE public.photos
    SET priority = %s
    WHERE id = %s;
'''

UPDATE_CONTENT_INFO = '''
    UPDATE public.content_info
    SET block_data = %s
    WHERE page_id = %s;
'''
UPDATE_SINGLE_OBJECT_QUERY = ('update public.construction_objects set index_photo_path = %s, object_photo_path = %s,'
                              ' name = %s where id =%s')

UPDATE_PHOTO_PATH_QUERY = 'update public.photos set path = %s where id = %s;'
INSERT_PHOTO_QUERY = 'insert into public.photos (path, object_id, visible) values (%s, %s, %s) returning id'


def get_single_object(object_id) -> Optional[ConstructionObjectInfo]:
    result = database_engine.fetch_one(GET_SINGLE_OBJECT_QUERY, (object_id,))
    if result:
        id, name, description, index_photo_path, object_photo_path, *_ = result
        print(
            f"DB_SERVICE:::Получен результат запроса: id: {id}, name: {name}, description: {description}, "
            f"index_photo_path: {index_photo_path}, object_photo_path: {object_photo_path}")

        object_dict = {
            'id': id,
            'name': name,
            'description': description,
            'index_photo_path': index_photo_path,
            'object_photo_path': object_photo_path
        }
        return object_dict  # возвращаем словарь с данными объекта
    else:
        return None  # или возвращаем пустой словарь, если объект не найден


def get_list_objects() -> List[ConstructionObjectInfo]:
    results = database_engine.fetch_all(GET_FROM_CONSTRUCTION_OBJECTS_QUERY)
    objects_list = []  # создаём пустой список, чтобы хранить словари

    for row in results:
        id, name, description, index_photo_path, object_photo_path, *_ = row
        print(
            f"DB_SERVICE:::Получен результат запроса: id: {id}, name: {name}, description: {description}, "
            f"index_photo_path: {index_photo_path}, object_photo_path: {object_photo_path}")

        # создаём словарь для текущей строки и добавляем его в список
        object_dict = {
            'id': id,
            'name': name,
            'description': description,
            'index_photo_path': index_photo_path,
            'object_photo_path': object_photo_path
        }
        objects_list.append(object_dict)

    return objects_list  # преобразуем список в кортеж и возвращаем его


def get_object_info(object_id: int) -> List[PhotoInfo]:
    results = database_engine.fetch_all(GET_OBJECT_INFO, (object_id,))
    info_list = []  # создаём пустой список, чтобы хранить словари

    for row in results:
        id, path, object_id, priority, is_visible = row
        print(f"DB_SERVICE::: Получен результат запроса: id: {id}, path: {path}, object_id: {object_id}, priority: {priority}")

        # создаём словарь для текущей строки и добавляем его в список
        info_dict: PhotoInfo = {
            'id': id,
            'path': path,
            'object_id': object_id,
            'prioirity': priority,
            'is_visible': is_visible
        }
        info_list.append(info_dict)

    return info_list  # возвращаем список словарей


def get_content_info(page_id):
    results = database_engine.fetch_all(GET_CONTENT_INFO, (page_id,))
    content_dict = {}
    for row in results:
        page_id, block_data = row
        print(f"DB_SERVICE:::Получен результат запроса: id: {page_id}, block_data: {block_data[:25]}")

        # создаём словарь для текущей строки и добавляем его в список
        content_dict = {
            'page_id': page_id,
            'block_data': block_data
        }

    return content_dict  # возвращаем список словарей


def get_all_priorities():
    results = database_engine.fetch_all(GET_ALL_PRIORITY)
    priorities_list = []

    for row in results:
        id, name, index_priority, object_priority = row
        print(
            f"DB_SERVICE:::Получен результат запроса: id: {id}, name: {name}, index_priority: {index_priority}, object_priority: {object_priority}")

        priority_dict = {
            'id': id,
            'name': name,
            'index_priority': index_priority,
            'object_priority': object_priority
        }
        priorities_list.append(priority_dict)

    return priorities_list


def set_priority(data):
    update_data = [(item["index_priority"], item["object_priority"], item["id"]) for item in data]
    database_engine.execute_many_sql(UPDATE_PRIORITY_QUERY, update_data)

def set_priority_images(data):
    update_data = [(item["priority"], item["id"]) for item in data]
    database_engine.execute_many_sql(UPDATE_PRIORITY_IMAGES_QUERY, update_data)


def set_block_data(page_id, block_data):
    database_engine.execute_sql(UPDATE_CONTENT_INFO, (block_data, page_id))


def delete_photos_by_ids(photo_ids: List[Any]):
    # Формируем кортеж из идентификаторов для запроса
    if len(photo_ids) == 0:
        return True

    photo_ids_tuple = tuple(photo_ids)

    # Выполняем SQL-запрос
    try:
        database_engine.execute_sql(DELETE_PHOTOS_BY_IDS, (photo_ids_tuple,))
        print(f"DB_SERVICE:::Удалены фотографии с ID: {photo_ids}")
        return True
    except Exception as e:
        print(f"DB_SERVICE:::Ошибка при удалении фотографий: {e}")
        raise e

def delete_object_info(object_id: int):
    # Выполняем SQL-запрос
    try:
        database_engine.execute_sql(DELETE_OBJECT_INFO_QUERY, object_id)
        print(f"DB_SERVICE:::Удален объект с ID: {object_id}")
        return True
    except Exception as e:
        print(f"DB_SERVICE:::Ошибка при удалении фотографий: {e}")
        raise e


# Dict имеет вид ключ - это id, значение это path(url)
def update_photo_paths(dicts_id_new_urls: Dict[int, str]):
    tuple_id_new_urls: List[Tuple[str ,int]] = [(url, id) for id, url in dicts_id_new_urls.items()]
    # Выполнение SQL-запроса для каждого кортежа
    try:
        database_engine.execute_many_sql(UPDATE_PHOTO_PATH_QUERY, tuple_id_new_urls)
        # noinspection PyTypeChecker
        for item in tuple_id_new_urls:
            new_path, _id = item
            print(f"DB_SERVICE:::Путь успешно обновлен для изображения id:{_id}, newPath:{new_path}")
        return True
    except Exception as e:
        print(f"DB_SERVICE:::Ошибка при обновлении путей изображения {dicts_id_new_urls}: {e}")
        raise e


def update_info_object(index_photo_path, object_photo_path, name, id):
    try:
        # Возвращаем ID новой записи, который был автоматически сгенерирован
        database_engine.execute_sql(UPDATE_SINGLE_OBJECT_QUERY,
                                             (index_photo_path, object_photo_path, name, id))
        print(f"DB_SERVICE:::Объект id:{id} с {{\n"
              f"name: {name},\n"
              f"index_photo_path: {index_photo_path},\n"
              f"object_photo_path: {object_photo_path}\n}}успешно обновлена.")
        return
    except Exception as e:
        print(f"Ошибка обновления объекта с id {id}: {e}")
        raise e


def insert_photo(path: str, object_id: int, visible: bool = True) -> int:
    """
    Вставка фотографии в базу данных и возвращение сгенерированного ID.
    """
    try:
        # Возвращаем ID новой записи, который был автоматически сгенерирован
        result = database_engine.execute_sql(INSERT_PHOTO_QUERY, (path, object_id, visible))
        print(f"DB_SERVICE:::Фотография с object_id:{object_id} с path: {path} успешно добавлена.")
        return result
    except Exception as e:
        print(f"DB_SERVICE:::Ошибка при добавлении фотографии: {e}")
        raise e
