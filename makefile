docker.run: docker.build
	docker-compose up

docker.push: docker.build
	docker-compose push

docker.build:
	docker-compose build

docker.zip:
	zip -r file-uploader.zip \
		docker-compose.yml \
		nginx.conf \
		.env
