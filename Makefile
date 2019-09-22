# コンテナを立ち上げる
up:
	docker-compose up
# マイグレーションファイルを適用する
migrate_up:
	docker-compose run --rm server npm run migration:up

# マイグレーションファイルを戻す
migrate_revert:
	docker-compose run --rm server npm run migration:revert

# serverコンテナのシェルを立ち上げる
server_sh:
	docker-compose exec server sh

# frontコンテナのシェルを立ち上げる
front_sh:
	docker-compose exec server sh

# serverコンテナ内でnpm iする
server_i:
	docker-compose run --rm server npm i

# frontコンテナ内でnpm iする
front_i:
	docker-compose run --rm front npm i
