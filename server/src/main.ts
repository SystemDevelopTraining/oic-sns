import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  createConnection } from 'typeorm'
import { User } from './entities/user';
import * as ormconfig from '../ormconfig';
import * as ormconfigProd from '../ormconfig.prod';
import passport = require('passport');

async function bootstrap() {
  // --- TypeORMの設定
  const connectionOptions =process.env.NODE_ENV === 'production'?ormconfigProd:ormconfig;
  const connection = await createConnection(connectionOptions as any);
  let userRepository = connection.getRepository(User);
  let user = new User();
  user.age = 777;
  user.name = "hoge";
  userRepository.save(user);
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
