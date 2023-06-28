# Используйте официальный образ nginx
FROM nginx:latest

# Копируйте свой сайт в контейнер
COPY site /usr/share/nginx/html

# Копируйте конфигурационный файл NGINX в контейнер
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
