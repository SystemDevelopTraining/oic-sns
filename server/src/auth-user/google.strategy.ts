import { OAuth2Strategy, Profile } from 'passport-google-oauth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvManager } from '../utils/env.manager';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy,"google") {
    constructor() {
        super({
            clientID    : EnvManager.googleClientId,    
            clientSecret: EnvManager.googleClientSecret, 
            callbackURL : EnvManager.googleCallbackUrl,
            passReqToCallback: true,
            scope: ['profile','email']
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile:Profile, done: Function)
    {
        try
        {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);

            const jwt: string = 'placeholderJWT'
            const user = 
            {
                jwt,
            }
            done(null, user);
        }
        catch(err)
        {
            // console.log(err)
            done(err, false);
        }
    }
}