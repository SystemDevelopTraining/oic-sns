import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserController } from './auth-user/auth-user.controller';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [AuthUserModule],
  controllers: [AppController, AuthUserController],
  providers: [AppService],
})
export class AppModule { }
