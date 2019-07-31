import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
    controllers:[AuthUserController],
    providers:[GoogleStrategy]
})
export class AuthUserModule {}
