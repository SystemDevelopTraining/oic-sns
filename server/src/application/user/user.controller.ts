import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../domain/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  test(@Res() res: Response) {
    this.userService.create();
    res.json('ok');
  }
}
