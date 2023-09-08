# Сборка образов и запуск контейнеров
build_and_run:
	docker-compose up --build -d

# Запуск контейнеров
run:
	docker-compose up -d

# Остановка контейнеров
stop:
	docker-compose down


synchronize:
	rsync -avz --exclude-from='rsyncignore.txt' . root@178.21.10.44:~/StoneMason67_Card

run-playbook:
	ansible-playbook -i ansible/hosts ansible/playbooks/certbook.yml
	ansible-playbook -i ansible/hosts ansible/playbooks/update_host.yml

connect:
	ssh root@178.21.10.44