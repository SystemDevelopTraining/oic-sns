import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './infrastructure/auth-user/auth-user.module';
import { UserModule } from './infrastructure/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './infrastructure/config/ormconfig';
import * as ormconfigProd from './infrastructure/config/ormconfig.prod';
import { PostModule } from './infrastructure/post/post.module';
import { TimelineModule } from './infrastructure/timeline/timeline.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthUserModule,
    UserModule,
    PostModule,
    TimelineModule,
    getTypeOrmModule(),
    CacheModule.register({ ttl: 8, max: 150 }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

function getTypeOrmModule() {
  // --- TypeORMの設定
  const connectionOptions =
    process.env.NODE_ENV === 'production' ? ormconfigProd : ormconfig;

  return TypeOrmModule.forRoot(connectionOptions as any);
}
