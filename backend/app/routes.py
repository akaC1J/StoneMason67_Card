import os.path
from typing import List

from flask import request

import db_service
from backend.app import file_service, security_service
from backend.app.db_service import PhotoInfo
from backend.app.security_service import token_required
from db_service import ConstructionObjectInfo


def init_routes(app):
    @app.route('/', methods=['GET'])
    @token_required
    def ok():
        return 'OK', 200

    @app.route('/api/upload_main_data', methods=['POST'])
    @token_required
    def upload_main_data():
        return file_service.upload_main_data(request)

    @app.route('/api/objects/', methods=['GET'])
    @token_required
    def get_all_objects():
        data: List[ConstructionObjectInfo] = db_service.get_list_objects()
        data = list(map(lambda el: _transform_data_short_url_to_full_main(el), data))
        return data, 200

    @app.route(f'/api/object_info/<int:object_id>', methods=['GET'])
    @token_required
    def get_object_info(object_id):
        data: List[PhotoInfo] = db_service.get_object_info(object_id)

        data = list(map(lambda el: _transform_data_short_url_to_full_added(el), data))
        return data, 200

    @app.route(f'/api/object_info/<int:object_id>', methods=['DELETE'])
    @token_required
    def delete_object_info(object_id):
        return file_service.delete_object_info(object_id)

    @app.route(f'/api/content_info/<string:page_id>', methods=['GET'])
    @token_required
    def get_content_info(page_id):
        data = db_service.get_content_info(page_id)
        return data, 200

    @app.route(f'/api/priority_images/', methods=['POST'])
    @token_required
    def set_priority_images():
        data = request.get_json()
        if any(not all(key in el for key in ["id", "priority"]) for el in data):
            return ({"error": "Bad Request", "message": "Missing required fields"}), 400
        try:
            db_service.set_priority_images(data)
        except Exception as e:
            print(str(e))
            return ({"error": "Internal Server Error"}), 500

        return ({"message": "Success"}), 200

    @app.route(f'/api/priority/', methods=['GET'])
    @token_required
    def get_all_priority():
        data = db_service.get_all_priorities()
        return data, 200

    @app.route('/api/priority/', methods=['POST'])
    @token_required
    def set_priority():
        data = request.get_json()  # Получаем JSON из запроса

        # Проверка наличия необходимых полей в JSON
        if any(not all(key in el for key in ["id", "index_priority", "object_priority"]) for el in data):
            return ({"error": "Bad Request", "message": "Missing required fields"}), 400

        # Передаем полный объект данных в функцию, которая взаимодействует с базой данных
        try:
            db_service.set_priority(data)
        except Exception as e:
            # Логируем исключение (в реальном коде используйте logging, не print)
            print(str(e))
            return ({"error": "Internal Server Error"}), 500

        return ({"message": "Success"}), 200

    @app.route('/api/content_info/', methods=['POST'])
    @token_required
    def set_content_info():
        data = request.get_json()  # Получаем JSON из запроса

        # Проверка наличия необходимых полей в JSON
        if not all(key in data for key in ["page_id", "block_data"]):
            return ({"error": "Bad Request", "message": "Missing required fields"}), 400

        # Передаем полный объект данных в функцию, которая взаимодействует с базой данных
        try:
            db_service.set_block_data(data["page_id"], data["block_data"])
        except Exception as e:
            # Логируем исключение (в реальном коде используйте logging, не print)
            print(str(e))
            return ({"error": "Internal Server Error"}), 500

        return ({"message": "Success"}), 200

    @app.route('/api/login/', methods=['POST'])
    def login() -> str:
        return security_service.auth(request.get_json()['password'])

    @app.after_request
    def apply_cors(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-ijt'
        return response


def _transform_data_short_url_to_full_added(element: PhotoInfo) -> PhotoInfo:
    full_path = None
    if element.get("path"):
        full_path = os.path.join(file_service.sub_base_url_adds_images, element["path"])

    return PhotoInfo(id=element["id"], path=full_path,
                     object_id=element["object_id"], is_visible=element["is_visible"])


def _transform_data_short_url_to_full_main(element: ConstructionObjectInfo) -> ConstructionObjectInfo:
    full_path_index = None
    full_path_object = None
    if element["index_photo_path"]:
        full_path_index = os.path.join(file_service.sub_base_url_index_path,
                                       element["index_photo_path"])
    if element["object_photo_path"]:
        full_path_object = os.path.join(file_service.sub_base_url_object_path,
                                        element["object_photo_path"])

    return ConstructionObjectInfo(id=element["id"],
                                  name=element["name"],
                                  index_photo_path=full_path_index,
                                  object_photo_path=full_path_object,
                                  description=element["description"],
                                  index_priority=element['index_priority'],
                                  object_priority=element['object_priority'])
