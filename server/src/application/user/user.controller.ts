import { Controller, Get, Res, Post, Req, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../domain/user/user.service';
import {UserDto} from '../../domain/user/user.dto';
import { User } from '../../domain/entities/user.entity';

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

  @Get('v1/:id')
  async findById(@Param('id') id: any): Promise<User> {
    return await this.userService.findById(id);
  }
}
