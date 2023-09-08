new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    showActiveTooltip: true,
    scrollingSpeed: 1400
});

let startX = 0;
let currentPercentage = 50;  // Изначальное значение
let isDragging = false;
let speed = 0.7;
let arrows = document.getElementsByClassName("arrow")
let startY = 0; // Добавим для отслеживания вертикального движения

function startDrag(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY; // Сохраняем начальную Y позицию

    let backgroundPosition = e.target.style.backgroundPosition;
    if (backgroundPosition) {
        currentPercentage = parseFloat(backgroundPosition.split(" ")[0].replace("%", ""));
    } else {
        currentPercentage = 50;
    }

    isDragging = true;
    e.target.style.transition = 'none'; // Отключаем плавное движение
}

function drag(e) {
    if (!isDragging) return;

    let containerWidth = e.target.clientWidth;
    let deltaX = e.touches[0].clientX - startX;
    let deltaY = e.touches[0].clientY - startY; // Вычисляем вертикальное смещение

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        // Запрещаем вертикальное перелистывание только при явном горизонтальном движении
        fullpage_api.setAllowScrolling(false);
        Array.from(arrows).forEach(arrow => arrow.style.display = 'none');
        let deltaPercentage = -(deltaX / containerWidth) * 100 * speed;
        let newPercentage = currentPercentage + deltaPercentage;

        if (newPercentage > 100) {
            newPercentage = 100;
        }
        if (newPercentage < 0) {
            newPercentage = 0;
        }
        e.target.style.backgroundPosition = `${newPercentage}% 0`;
    }
}
function stopDrag(e) {
    isDragging = false;
    e.target.style.transition = 'background-position 0.5s ease';
    e.target.style.backgroundPosition = "";  // Можете установить другое значение, если хотите вернуть изображение в другое положение после прекращения прокрутки

    // Разрешаем вертикальное перелистывание fullpage
    fullpage_api.setAllowScrolling(true);
    currentPercentage = 50
    startX=0
}

function mouseStartDrag(e) {
    startX = e.clientX;
    startY = e.clientY;

    let backgroundPosition = e.target.style.backgroundPosition;
    if (backgroundPosition) {
        currentPercentage = parseFloat(backgroundPosition.split(" ")[0].replace("%", ""));
    } else {
        currentPercentage = 50;
    }

    isDragging = true;
    e.target.style.transition = 'none';
}

function mouseDrag(e) {
    if (!isDragging) return;

    let containerWidth = e.target.clientWidth;
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        fullpage_api.setAllowScrolling(false);
        Array.from(arrows).forEach(arrow => arrow.style.display = 'none');
        let deltaPercentage = -(deltaX / containerWidth) * 100 * speed;
        let newPercentage = currentPercentage + deltaPercentage;

        if (newPercentage > 100) {
            newPercentage = 100;
        }
        if (newPercentage < 0) {
            newPercentage = 0;
        }
        e.target.style.backgroundPosition = `${newPercentage}% 0`;
    }
}

function mouseStopDrag(e) {
    isDragging = false;
    e.target.style.transition = 'background-position 0.5s ease';
    e.target.style.backgroundPosition = "";

    fullpage_api.setAllowScrolling(true);
    currentPercentage = 50
    startX=0
}

// Выберите все элементы, которые вы хотите анимировать:
let animatedElements = document.querySelectorAll('.bg-image');

animatedElements.forEach(element => {
    // Для сенсорных устройств
    element.addEventListener('touchstart', startDrag, false);
    element.addEventListener('touchmove', drag, false);
    element.addEventListener('touchend', stopDrag, false);

    // Для мыши
    element.addEventListener('mousedown', mouseStartDrag, false);
    element.addEventListener('mousemove', mouseDrag, false);
    element.addEventListener('mouseup', mouseStopDrag, false);
});

