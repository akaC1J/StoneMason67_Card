# План Разработки

## 1. Разработка API Эндпоинтов

**Цель:** Создать API для управления контентом на сайте.

### 1.1 Загрузка Контента и Изображений
- Использование Flask для обработки REST запросов и изображений одновременно.
- Исследовать возможность использования `Flask-Uploads` для обработки загрузки изображений.

### 1.2 Создание API Эндпоинтов
- POST: Добавление нового контента.
- GET: Получение существующего контента.
- PUT: Обновление существующего контента.
- DELETE: Удаление контента.

## 2. Разработка Админ-Панели

**Цель:** Создать SPA для управления контентом на сайте.

### 2.1 Фронтенд
- Разработка SPA с использованием Webpack.
- Использование шаблона, подобного основному сайту.

### 2.2 Функциональность
- Аутентификация администратора.
- CRUD операции через API.
- Предпросмотр изменений перед публикацией.

## 3. Защита API с использованием JWT

**Цель:** Обеспечить безопасность эндпоинтов API с использованием JWT.

## Пример кода:
```agsl
pip install Flask Flask-JWT-Extended
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

____
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    # Add your user validation logic here

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message='This is a protected route!')

_____
async function login(username, password) {
    const response = await fetch('http://your-api-url/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
    } else {
        console.error('Login failed!');
    }
}
_____
async function fetchProtectedData() {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        console.error('No token found!');
        return;
    }

    const response = await fetch('http://your-api-url/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        console.error('Failed to fetch protected data:', data);
    }
}
```
### 3.1 Backend (Flask)
- Использование `Flask-JWT-Extended`.
- Создание эндпоинта для аутентификации и получения токена.
- Защита эндпоинтов с использованием `@jwt_required()`.

### 3.2 Frontend (JavaScript)
- Реализация функций для аутентификации и использования JWT.

## 4. Дальнейшие Шаги

### 4.1 Тестирование
- Тестирование функционала API и фронтенда админ-панели.

### 4.2 Деплой
- Настройка сервера и использование Docker для деплоя.

### 4.3 Документация
- Создание документации API и руководства пользователя.

### 4.4 Обратная Связь
- Сбор обратной связи от пользователей и планирование улучшений.

