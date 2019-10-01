import { Module } from '@nestjs/common';
import { AuthUserController } from '../../application/auth-user/auth-user.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthUserService } from '../../domain/auth-user/services/auth-user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { UserExistService } from '../../domain/auth-user/services/user-exist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthUserController],
  providers: [GoogleStrategy, JwtStrategy, AuthUserService, UserExistService],
})
export class AuthUserModule {}
