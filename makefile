docker.run: docker.build
	docker-compose up

docker.push: docker.build
	docker-compose push

docker.build:
	docker-compose build

docker.clean:
	docker-compose down

docker.zip:
	touch frontend/dummy
	touch backend/dummy
	zip -r file-uploader.zip \
		docker-compose.yml \
		nginx.conf \
		.env \
		frontend/dummy backend/dummy

k8s.run:
	kubectl apply -f k8s

k8s.port-forward: k8s.run
	kubectl port-forward services/frontend 8080:80

k8s.clean:
	kubectl delete -f k8s
