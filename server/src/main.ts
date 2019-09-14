import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
