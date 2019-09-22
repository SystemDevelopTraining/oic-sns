[![CircleCI](https://circleci.com/gh/SystemDevelopTraining/oic-sns.svg?style=svg)](https://circleci.com/gh/SystemDevelopTraining/oic-sns)

## 初期セットアップ

```
git clone git@github.com:SystemDevelopTraining/oic-sns.git
cd oic-sns
cp server/.env.sample server/.env
docker-compose build
docker-compose run --rm server npm i
docker-compose run --rm front npm i
```

## .envの設定

google APIの環境変数,jwt用のSECRET keyを手動で設定する必要があります。


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
