import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  createConnection } from 'typeorm'
import { User } from './entities/user';
import * as ormconfig from '../ormconfig';
import * as ormconfigProd from '../ormconfig.prod';

async function bootstrap() {
  // --- TypeORMの設定
  const connectionOptions =process.env.NODE_ENV === 'production'?ormconfigProd:ormconfig;
  console.log(connectionOptions);
  const connection = await createConnection(connectionOptions as any);
  console.log(connection.entityMetadatas);
  let userRepository = connection.getRepository(User);
  let user = new User();
  user.age = 777;
  user.name = "hoge";
  userRepository.save(user);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
