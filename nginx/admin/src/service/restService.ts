// Функция для получения всех объектов
export async function getAllObjects(): Promise<any> {
    const response = await fetch('http://localhost:5000/api/objects/');
    const data = await response.json();
    return data;
}

// Функция для получения информации об объекте по ID
export async function getObjectInfo(objectId: number): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/object_info/${objectId}`);
    const data = await response.json();
    return data;
}

// Функция для получения информации о контенте по page_id
export async function getContentInfo(pageId: string): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/content_info/${pageId}`);
    const data = await response.json();
    return data;
}

export async function getAllPriority(): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/priority/`);
    const data = await response.json();
    return data;
}

export async function setContentInfo(contentInfo: {page_id: string, block_data: string}): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/content_info/`, {
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'  // указываем тип контента в заголовке
        },
        body: JSON.stringify(contentInfo)  // преобразуем объект contentInfo в строку JSON
    });

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }


      // разбираем ответ сервера в JSON
    return await response.json();
}

export async function setPriority(priorities: { id: number; index_priority: number; object_priority: number }[]): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/priority/`, {
        method: 'POST',  // указываем метод запроса
        headers: {
            'Content-Type': 'application/json'  // указываем тип контента в заголовке
        },
        body: JSON.stringify(priorities)  // преобразуем объект contentInfo в строку JSON
    });

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }


    // разбираем ответ сервера в JSON
    return await response.json();
}

// Функция для отправки данных формы на сервер
export async function sendFormData(formData: FormData): Promise<any> {
    const response = await fetch('http://localhost:5000/api/upload_main_data', {
        method: 'POST', // указываем метод запроса
        body: formData  // отправляем данные формы без заголовка 'Content-Type'
        // браузер автоматически добавит нужный заголовок 'Content-Type' и boundary
    });

    // Проверяем, успешно ли выполнился запрос
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }

    // Разбираем ответ сервера в JSON
    return await response.json();
}


//
// // Пример использования
// getAllObjects().then(data => console.log(data));
// getObjectInfo(1).then(data => console.log(data));
// getContentInfo('some_page_id').then(data => console.log(data));
