docker.run: docker.build
	docker-compose up

docker.push: docker.build
	docker-compose push

docker.build:
	docker-compose build

docker.zip:
	touch frontend/dummy
	touch backend/dummy
	zip -r file-uploader.zip \
		docker-compose.yml \
		nginx.conf \
		.env \
		frontend/dummy backend/dummy
