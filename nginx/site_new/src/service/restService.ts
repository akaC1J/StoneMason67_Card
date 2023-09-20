// Функция для получения всех объектов
async function getAllObjects(): Promise<any> {
    const response = await fetch('http://localhost:5000/api/objects/');
    const data = await response.json();
    return data;
}

// Функция для получения информации об объекте по ID
async function getObjectInfo(objectId: number): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/object_info/${objectId}`);
    const data = await response.json();
    return data;
}

// Функция для получения информации о контенте по page_id
async function getContentInfo(pageId: string): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/content_info/${pageId}`);
    const data = await response.json();
    return data;
}

// Пример использования
getAllObjects().then(data => console.log(data));
getObjectInfo(1).then(data => console.log(data));
getContentInfo('some_page_id').then(data => console.log(data));
