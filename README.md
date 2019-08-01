## 初期セットアップ

```
git clone git@github.com:SystemDevelopTraining/oic-sns.git
cd oic-sns
cp server/.env.sample server/.env
docker-compose build
docker-compose run --rm server npm i
docker-compose run --rm front npm i
```

## 起動

```
docker-compose up
```

フロントだけ起動したい場合

```
docker-compose up front
```

バックグラウンドで起動したい場合

```
docker-compose up -d
```

## 停止

```
docker-compose down
```

## 各サービスの説明

### フロント

url: localhost:8080

### サーバー

url: localhost:3000

### phpadmin

url: localhost:3881
