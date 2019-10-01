import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './infrastructure/auth-user/auth-user.module';
import { UserModule } from './infrastructure/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './infrastructure/config/ormconfig';
import * as ormconfigProd from './infrastructure/config/ormconfig.prod';

@Module({
  imports: [AuthUserModule, UserModule, getTypeOrmModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function getTypeOrmModule() {
  // --- TypeORMの設定
  const connectionOptions =
    process.env.NODE_ENV === 'production' ? ormconfigProd : ormconfig;

  return TypeOrmModule.forRoot(connectionOptions as any);
}
