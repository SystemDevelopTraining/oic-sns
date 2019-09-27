import { Controller, Get, Res, Post, Req, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../domain/user/user.service';
import {UserDto} from '../../domain/user/user.dto';
import { User } from '../../domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('v1')
  async create(@Body() userDto: UserDto): Promise<number> {
    return this.userService.create(userDto).then(x => x.id);
  }

  @Get('v1/:id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }
}
