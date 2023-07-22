import os
from flask import Flask, request, abort
import redis
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv("../../.env")
# создание Redis клиента
redis_host = os.getenv("REDIS_HOST")
redis_port = os.getenv("REDIS_PORT")
redis_password = os.getenv("REDIS_PASSWORD")
r = redis.Redis(host=redis_host, port=redis_port, password=redis_password)


@app.route("/")
def index():
    print('got it')
    return "Congratulations, it's a web app!"


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
