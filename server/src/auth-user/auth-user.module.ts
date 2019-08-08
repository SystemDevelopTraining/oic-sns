import { Module } from '@nestjs/common';
import { AuthUserController } from './controllers/auth-user.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthUserService } from './services/auth-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthUserController],
  providers: [GoogleStrategy, JwtStrategy, AuthUserService],
})
export class AuthUserModule {}
