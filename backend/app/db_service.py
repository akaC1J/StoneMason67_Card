import database_engine


def add_object_to_db(data):
    pass


GET_FROM_CONSTRUCTION_OBJECTS_QUERY = 'select * from public.construction_objects'
GET_OBJECT_INFO = 'select * from public.photos where object_id=%s'
GET_CONTENT_INFO = 'select * from public.content_info where page_id=%s'


def get_list_objects():
    results = database_engine.fetch_all(GET_FROM_CONSTRUCTION_OBJECTS_QUERY)
    for row in results:
        id = row[0]
        name = row[1]
        description = row[2]
        index_photo_path = row[3]
        object_photo_path = row[4]
        print(
            f"Получен результат запроса: id: {id}, name: {name}, description: {description}, index_photo_path: {index_photo_path}, object_photo_path: {object_photo_path}")
    return results


def get_object_info(object_id):
    results = database_engine.fetch_all(GET_OBJECT_INFO, (object_id,))
    for row in results:
        id = row[0]
        path = row[1]
        object_id = row[2]
        print(f"Получен результат запроса: id: {id}, path: {path}, object_id: {object_id}")
    return results


def get_content_info(page_id):
    results = database_engine.fetch_all(GET_CONTENT_INFO, (page_id,))
    for row in results:
        page_id = row[0]
        block_data = row[1]
        print(f"Получен результат запроса: id: {page_id}, block_data: {block_data[:25]}")
    return results
