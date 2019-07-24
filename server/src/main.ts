import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'

async function bootstrap() {
  // --- TypeORMの設定
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
