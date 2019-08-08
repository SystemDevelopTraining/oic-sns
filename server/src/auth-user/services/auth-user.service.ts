import { sign } from 'jsonwebtoken';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvManager } from '../../utils/env.manager';
import { JwtPayload } from '../domains/jwt.payload';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthUserService {
  private readonly JWT_SECRET_KEY = EnvManager.jwtSecretKey;

  constructor(/*private readonly usersService: UsersService*/) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload: JwtPayload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
