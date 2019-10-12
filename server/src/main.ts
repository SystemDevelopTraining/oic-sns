import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
