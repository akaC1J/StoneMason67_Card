import database_engine


def add_object_to_db(data):
    pass


GET_FROM_CONSTRUCTION_OBJECTS_QUERY = 'select * from public.construction_objects'
GET_OBJECT_INFO = 'select * from public.photos where object_id=%s'
GET_CONTENT_INFO = 'select * from public.content_info where page_id=%s'


def get_list_objects():
    results = database_engine.fetch_all(GET_FROM_CONSTRUCTION_OBJECTS_QUERY)
    objects_list = []  # создаём пустой список, чтобы хранить словари

    for row in results:
        id, name, description, index_photo_path, object_photo_path = row
        print(
            f"Получен результат запроса: id: {id}, name: {name}, description: {description}, "
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


def get_object_info(object_id):
    results = database_engine.fetch_all(GET_OBJECT_INFO, (object_id,))
    info_list = []  # создаём пустой список, чтобы хранить словари

    for row in results:
        id, path, object_id, is_visible = row
        print(f"Получен результат запроса: id: {id}, path: {path}, object_id: {object_id}")

        # создаём словарь для текущей строки и добавляем его в список
        info_dict = {
            'id': id,
            'path': path,
            'object_id': object_id,
            'is_visible': is_visible
        }
        info_list.append(info_dict)

    return info_list  # возвращаем список словарей


def get_content_info(page_id):
    global content_dict
    results = database_engine.fetch_all(GET_CONTENT_INFO, (page_id,))

    for row in results:
        page_id, block_data = row
        print(f"Получен результат запроса: id: {page_id}, block_data: {block_data[:25]}")

        # создаём словарь для текущей строки и добавляем его в список
        content_dict = {
            'page_id': page_id,
            'block_data': block_data
        }

    return content_dict  # возвращаем список словарей
