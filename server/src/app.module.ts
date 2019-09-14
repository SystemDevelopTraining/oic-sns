import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserController } from './auth-user/controllers/auth-user.controller';
import { AuthUserModule } from './auth-user/auth-user.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import * as ormconfigProd from '../ormconfig.prod';

@Module({
  imports: [AuthUserModule, UserModule, getTypeOrmModule()],
  controllers: [AppController, AuthUserController],
  providers: [AppService],
})
export class AppModule {}

function getTypeOrmModule() {
  // --- TypeORMの設定
  const connectionOptions =
    process.env.NODE_ENV === 'production' ? ormconfigProd : ormconfig;

  return TypeOrmModule.forRoot(connectionOptions as any);
}
