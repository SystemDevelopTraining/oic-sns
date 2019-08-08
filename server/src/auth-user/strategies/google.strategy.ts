import { OAuth2Strategy, Profile } from 'passport-google-oauth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvManager } from '../../utils/env.manager';
import { AuthUserService, Provider } from '../services/auth-user.service';

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
    return Object.assign(options, {
      hd: 'oic.jp',
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    try {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);

      const jwt: string = await this.authUserService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = { jwt };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
