import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { GoogleStrategy } from './google.strategy';
import { AuthUserService } from './auth-user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthUserController],
    providers: [GoogleStrategy, JwtStrategy, AuthUserService],
})
export class AuthUserModule { }
