docker rm -f my-nginx-container
docker build -t my-nginx ..
docker run -d -p 80:80 --name my-nginx-container my-nginx:latest