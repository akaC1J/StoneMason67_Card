import {getToken} from "./service/restService";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;

    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const password = passwordInput.value;

        getToken({password})
            .then(tokenObj => {
                // Сохранение токена в локальное хранилище
                localStorage.setItem('authToken', tokenObj.token);
                window.location.href = "index.html";

            })
            .catch(error => {
                console.error('Ошибка при входе:', error);
                // Обработка ошибок входа
            });
    });
});