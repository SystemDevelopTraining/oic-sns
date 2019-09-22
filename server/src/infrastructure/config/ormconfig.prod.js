module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'mysql', // 接続するDBホスト名
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER, // DBユーザ名
  password: process.env.MYSQL_PASSWORD, // DBパスワード
  database: process.env.MYSQL_DATABASE, // DB名
  synchronize: false,
  logging: false,
  entities: [__dirname + '/domain/entities/**/*.js'],
  migrations: [__dirname + '/infrastructure/db/migrations/**/*.js'],
  cli: {
    entitiesDir: __dirname + '/domain/entities',
    migrationsDir: __dirname + '/infrastructure/db/migrations',
  },
};
