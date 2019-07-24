import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionOptions, createConnection } from 'typeorm'
import { User } from './entities/user';

async function bootstrap() {
  // --- TypeORMの設定
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions);
  let userRepository = connection.getRepository(User);
  let user = new User();
  user.age = 777;
  user.name = "hoge";
  userRepository.save(user);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
