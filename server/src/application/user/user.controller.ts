import { Controller, Get, Res, Post, Req, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../domain/user/user.service';
import { get } from 'https';
import bodyParser = require('body-parser');
import {UserDto} from '../../domain/user/user.dto';
import request = require('superagent');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  test(@Res() res: Response) {
    res.json('ok');
  }

  @Post('v1')
  create(@Body() userDto: UserDto) {
    this.userService.create(userDto);
    console.log(userDto);
  }
}
