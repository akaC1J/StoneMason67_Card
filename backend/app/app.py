import os

import redis
from dotenv import load_dotenv
from flask import Flask, request, abort

# from model import db, ConstructionObject, Photo

app = Flask(__name__)

load_dotenv("../../.env")
# создание Redis клиента
redis_host = os.getenv("REDIS_HOST")
redis_port = os.getenv("REDIS_PORT")
redis_password = os.getenv("REDIS_PASSWORD")
r = redis.Redis(host=redis_host, port=redis_port, password=redis_password)

# # создание Postges клиента
# db_user = os.getenv("DB_USER")
# db_password = os.getenv("DB_PASSWORD")
# db_host = os.getenv("DB_HOST")
# db_name = os.getenv("DB_NAME")
#
# app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{db_user}:{db_password}@{db_host}/{db_name}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)


@app.route("/")
def index():
    print('got it')
    return "Congratulations, it's a web app!"


# @app.route('/api/objects/', methods=['POST'])
# def add_object():
#     data = request.get_json()
#     new_object = ConstructionObject(
#         name=data['name'],
#         description=data['description'],
#         index_photo_path=data['main_photo_path'],
#         object_photo_path=data['pre_main_photo_path']
#     )
#     db.session.add(new_object)
#
#     for image_data in data['images']:
#         new_image = Photo(
#             path=image_data['path'],
#             object_name=data['name'],
#             visible=image_data['visible']
#         )
#         db.session.add(new_image)
#
#     db.session.commit()
#
#     uploaded_files = request.files.getlist('images')
#     return {"message": "Construction object added successfully"}, 201


@app.route('/api/contact', methods=['POST'])
def submit_form():
    contact_method = request.form.get('contact_method')

    if contact_method not in ['email', 'phone', 'telegram', 'whatsapp']:
        abort(400, 'Неправильный тип контакта')

    form_data = {
        "Имя": request.form.get('name'),
        "Способ контакта": contact_method,
        "Контакт": request.form.get('contact'),
        "Сообщение": request.form.get('message')
    }

    form_data_str = '\n'.join([f"{field}: {value}" for field, value in form_data.items()])  # Форматированная строка

    r.rpush('message_deque', form_data_str)
    return "Сообщение отправлено успешно!"


if __name__ == "__main__":
    app.run(host="0.0.0.0")
