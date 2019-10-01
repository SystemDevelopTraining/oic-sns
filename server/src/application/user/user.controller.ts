import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UserDto } from '../../domain/user/user.dto';
import { User } from '../../domain/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('v1')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() userDto: UserDto, @Req() req: Request): Promise<number> {
    return await this.userService
      .create(userDto, (req.user as JwtPayload).thirdPartyId)
      .then(x => x.id);
  }

  @Get('v1/:id')
  async findById(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.findById(id);
    } catch (e) {
      throw new HttpException(
        'そのIDのユーザは存在しません',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
