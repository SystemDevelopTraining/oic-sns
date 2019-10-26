import { Module } from '@nestjs/common';
import { UserController } from '../../application/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Following } from '../../domain/entities/following.entity';
import { UserService } from '../../domain/user/user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { GoogleProfilesData } from '../temp-data/google.profiles.data';

@Module({
  imports: [TypeOrmModule.forFeature([User, Following])],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    { provide: 'GoogleProfilesRepository', useClass: GoogleProfilesData },
  ],
})
export class UserModule {}
