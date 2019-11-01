import { OAuth2Strategy, Profile } from 'passport-google-oauth';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvManager } from '../../../utils/env.manager';
import {
  AuthUserService,
  Provider,
} from '../../../domain/auth-user/services/auth-user.service';
import { GoogleProfilesData } from '../../temp-data/google.profiles.data';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly authUserService: AuthUserService) {
    super({
      clientID: EnvManager.googleClientId,
      clientSecret: EnvManager.googleClientSecret,
      callbackURL: EnvManager.googleCallbackUrl,
      passReqToCallback: true,
      scope: ['profile', 'email'],
      hostedDomain: 'oic.jp',
    });
  }

  authorizationParams(options: unknown): unknown {
    return {
      ...options,
      hd: 'oic.jp',
      prompt: 'select_account',
    };
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    try {
      new GoogleProfilesData().saveProfile(profile);

      const jwt: string = await this.authUserService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const oicNumber = profile.emails[0].value.substr(0, 5);
      if (/^b\d\d\d\d/.test(oicNumber) === false)
        throw new BadRequestException("バリデーションエラー");
      const user = { jwt, googleProfileId: profile.id };
      done(null, user);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
