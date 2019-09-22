import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { EnvManager } from '../../utils/env.manager';

@Controller('auth-user')
export class AuthUserController {
  @UseGuards(AuthGuard('google'))
  @Get('v1')
  googleOAuth() {}

  @Get('v1/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: any, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    res.redirect(EnvManager.frontUrl + '/?jwt=' + jwt);
  }

  @Get('v1/protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req: any) {
    return (
      'JWT is working! profile_id=' + (req.user as JwtPayload).thirdPartyId
    );
  }
}
