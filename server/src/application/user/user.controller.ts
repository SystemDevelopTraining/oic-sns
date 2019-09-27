import { Controller, Get, Res, Post, Req, Body, Param, UseFilters, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import {UserDto} from '../../domain/user/user.dto';
import { User } from '../../domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('v1')
  async create(@Body() userDto: UserDto): Promise<number> {
    try {
      return await this.userService.create(userDto).then(x => x.id);
    } catch (e) {
      throw new HttpException('情報が足りません', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('v1/:id')
  async findById(@Param('id') id: number): Promise<User> {
    try{
      return await this.userService.findById(id);
    } catch (e) {
      throw new HttpException('そのIDのユーザは存在しません', HttpStatus.NOT_FOUND);
    }
  }
}
