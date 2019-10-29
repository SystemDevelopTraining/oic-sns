import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, //単位はms
      max: 75, //1人のユーザのwindowMsあたりのリクエスト数
    }),
  );
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:8080', 'https://oicity.netlify.com'],
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
