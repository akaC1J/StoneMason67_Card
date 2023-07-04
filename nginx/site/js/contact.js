const contactForm = document.getElementById('contact_form');
const contactChoice = document.getElementById('contact_method');
const contact = document.getElementById('contact');

const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const phoneRegEx = /^(?:\+7|8|7)\d{10}$/;

contactChoice.addEventListener('change', function() {
    switch (this.value) {
        case 'email':
            contact.placeholder = "Email";
            break;
        case 'phone':
        case 'telegram':
        case 'whatsapp':
            contact.placeholder = "Номер телефона";
            break;
    }
});

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // получаем элементы ошибок
    const contactError = document.getElementById('contactError');

    // очистить ошибки перед валидацией
    contactError.innerText = "";

    switch (contactChoice.value) {
        case 'email':
            if (!emailRegEx.test(contact.value)) {
                contactError.innerText = 'Пожалуйста, введите корректный адрес электронной почты.';
                contact.value = '';
                return;
            }
            break;
        case 'phone':
        case 'telegram':
        case 'whatsapp':
            if (!phoneRegEx.test(contact.value)) {
                contactError.innerText = 'Пожалуйста, введите корректный номер телефона в формате +79999999999, 89999999999 или 79999999999.';
                contact.value = '';
                return;
            }
            break;
    }

    alert('Форма успешно отправлена!');
});

// обработчик события input
contact.addEventListener('input', function() {
    const contactError = document.getElementById('contactError');
    contactError.innerText = "";
});
