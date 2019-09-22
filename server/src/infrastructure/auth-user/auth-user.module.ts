import { Module } from '@nestjs/common';
import { AuthUserController } from '../../application/auth-user/auth-user.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthUserService } from '../../domain/auth-user/services/auth-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthUserController],
  providers: [GoogleStrategy, JwtStrategy, AuthUserService],
})
export class AuthUserModule {}
