import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth-user')
export class AuthUserController {
    @UseGuards(AuthGuard('google'))
    @Get()
    googleOAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req: any, @Res() res: Response) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        res.redirect('/?jwt=' + jwt);
    }

    @Get('v1/protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT is working!';
    }
}
