import os
import secrets
from functools import wraps

from flask import request

expected_password = os.getenv("ADMIN_PANEL_PASSWORD")
active_token = None


def auth(password: str):
    if password == expected_password:
        token = secrets.token_urlsafe(16)  # Генерация простого токена
        global active_token
        active_token = token
        return {"token": token}, 200
    else:
        return {"message": "Unauthorized"}, 401


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Проверка наличия токена в заголовке Authorization
        token = request.headers.get('Authorization').split(' ')[1]
        if not active_token or active_token != token:
            return {"message": "Unauthorized"}, 401
        return f(*args, **kwargs)
    return decorated_function

