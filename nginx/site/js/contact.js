const contactForm = document.getElementById('contact_form');
const contactChoice = document.getElementById('contact_method');
const contact = document.getElementById('contact');
const success_label = document.getElementById('success_label');

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

    let contactValue = contact.value.trim();
    let isValid = true;

    switch (contactChoice.value) {
        case 'email':
            if (!emailRegEx.test(contactValue)) {
                contactError.innerText = 'Пожалуйста, введите корректный адрес электронной почты.';
                isValid = false;
            }
            break;
        case 'phone':
        case 'telegram':
        case 'whatsapp':
            if (!phoneRegEx.test(contactValue)) {
                contactError.innerText = 'Пожалуйста, введите корректный номер телефона в формате +79999999999, 89999999999 или 79999999999.';
                isValid = false;
            }
            break;
    }

    if (isValid) {
        const formData = new FormData(contactForm);
        fetch('/api/contact', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка сервера, попробуйте позже");
                }
                success_label.style.display = 'block'
            })
            .catch(error => {
                // Показ сообщения об ошибке
                console.log(error.message);
            });
    }
});

// обработчик события input
contact.addEventListener('input', function() {
    const contactError = document.getElementById('contactError');
    contactError.innerText = "";
});

contactForm.addEventListener('input' , () => success_label.style.display = 'none')