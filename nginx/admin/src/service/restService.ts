// Функция для получения всех объектов
export async function getAllObjects(): Promise<any> {
    let options = enrichWithAuthToken();
    const response = await fetch('http://localhost:5000/api/objects/', options);
    const data = await response.json();
    return data;
}

// Функция для получения информации об объекте по ID
export async function getObjectInfo(objectId: number): Promise<any> {
    let options = enrichWithAuthToken();
    const response = await fetch(`http://localhost:5000/api/object_info/${objectId}`, options);
    const data = await response.json();
    return data;
}

export async function deleteObjectInfo(objectId: number): Promise<any> {
    let options = enrichWithAuthToken({
        method: 'DELETE'
    });
    const response = await fetch(`http://localhost:5000/api/object_info/${objectId}`, options);
    const data = await response.json();
    return data;
}

// Функция для получения информации о контенте по page_id
export async function getContentInfo(pageId: string): Promise<any> {
    let options = enrichWithAuthToken();
    const response = await fetch(`http://localhost:5000/api/content_info/${pageId}`, options);
    const data = await response.json();
    return data;
}

export async function getAllPriority(): Promise<any> {
    let options = enrichWithAuthToken();
    const response = await fetch(`http://localhost:5000/api/priority/`, options);
    const data = await response.json();
    return data;
}

export async function getToken(passwordObject: {password: string}): Promise< {"token": string}> {
    const response = await fetch(`http://localhost:5000/api/login/`, {
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordObject)
    });
    if (!response.ok) {
        alert("Ошибка входа")
        throw new Error("Ошибка входа: " + response.statusText)
    }
    return response.json();
}

export async function setContentInfo(contentInfo: {page_id: string, block_data: string}): Promise<any> {
    let options = enrichWithAuthToken({
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'  // указываем тип контента в заголовке
        },
        body: JSON.stringify(contentInfo)  // преобразуем объект contentInfo в строку JSON
    });
    const response = await fetch(`http://localhost:5000/api/content_info/`, options);

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }


      // разбираем ответ сервера в JSON
    return await response.json();
}

export async function setPriority(priorities: { id: number; index_priority: number; object_priority: number }[]): Promise<any> {
    let options = enrichWithAuthToken({
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'  // указываем тип контента в заголовке
        },
        body: JSON.stringify(priorities)  // преобразуем объект contentInfo в строку JSON
    });
    const response = await fetch(`http://localhost:5000/api/priority/`, options);

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }


    // разбираем ответ сервера в JSON
    return await response.json();
}

export async function setImgPriority(priorities: {id: number; priority: number }[]): Promise<any> {
    let options = enrichWithAuthToken({
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'  // указываем тип контента в заголовке
        },
        body: JSON.stringify(priorities)  // преобразуем объект contentInfo в строку JSON
    });
    const response = await fetch(`http://localhost:5000/api/priority_images/`, options);

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }


    // разбираем ответ сервера в JSON
    return await response.json();
}

// Функция для отправки данных формы на сервер
export async function sendFormData(formData: FormData): Promise<any> {
    let options = enrichWithAuthToken({
        method: 'POST', // указываем метод запроса
        body: formData  // отправляем данные формы без заголовка 'Content-Type'
        // браузер автоматически добавит нужный заголовок 'Content-Type' и boundary
    });
    const response = await fetch('http://localhost:5000/api/upload_main_data', options);

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }

    // Разбираем ответ сервера в JSON
    return await response.json();
}


function enrichWithAuthToken(options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');

    // Если токен существует, добавляем его в заголовки
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    return options;
}
