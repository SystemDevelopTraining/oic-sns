import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { EnvManager } from '../../utils/env.manager';
import { UserExistService } from '../../domain/auth-user/services/user-exist.service';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly userExistService: UserExistService) {}

  @UseGuards(AuthGuard('google'))
  @Get('v1')
  googleOAuth() {}

  @Get('v1/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    const googleProfileId: string = req.user.googleProfileId;

    if (await this.userExistService.isExistUser(googleProfileId)) {
      res.redirect(EnvManager.frontUrl + '/timeline/?jwt=' + jwt);
    } else {
      res.redirect(EnvManager.frontUrl + '/user_init_profile/?jwt=' + jwt);
    }
  }

  @Get('v1/protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req: any) {
    return (
      'JWT is working! profile_id=' + (req.user as JwtPayload).thirdPartyId
    );
  }
}
