up:
	docker-compose up

migrate_up:
	docker-compose run --rm server npm run migration:up

migrate_revert:
	docker-compose run --rm server npm run migration:revert

server_sh:
	docker-compose exec server sh

front_sh:
	docker-compose exec server sh

server_i:
	docker-compose run --rm server npm i

front_i:
	docker-compose run --rm front npm i
