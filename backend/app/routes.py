from flask import request, abort

import db_service

def init_routes(app):

    @app.route('/', methods=['GET'])
    def ok():
        return 'OK', 200

    @app.route('/api/objects/', methods=['POST'])
    def add_object_route():
        data = request.get_json()
        db_service.add_object_to_db();
        return {"message": "Construction object added successfully"}, 201

    @app.route('/api/objects/', methods=['GET'])
    def get_all_objects():
        data = db_service.get_list_objects();
        return data, 200

    @app.route(f'/api/object_info/<int:object_id>', methods=['GET'])
    def get_object_info(object_id):
        data = db_service.get_object_info(object_id)
        return data, 200

    @app.route(f'/api/content_info/<string:page_id>', methods=['GET'])
    def get_content_info(page_id):
        data = db_service.get_content_info(page_id)
        return data, 200

    @app.route(f'/api/priority/', methods=['GET'])
    def get_all_priority():
        data = db_service.get_all_priorities()
        return data, 200

    @app.after_request
    def apply_cors(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-ijt'
        return response

