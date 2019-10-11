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
import { FollowResult } from '../../domain/user/response/follow-result';
import { FollowUserInfo } from '../../domain/user/response/follow-user-info';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //ユーザ作成
  @Post('v1')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() userDto: UserDto, @Req() req: Request): Promise<number> {
    return await this.userService
      .create(userDto, (req.user as JwtPayload).thirdPartyId)
      .then(x => x.id);
  }

  //自身のユーザidを返す
  @Get('v1/my_user')
  @UseGuards(AuthGuard('jwt'))
  async myUserId(@Req() req: Request): Promise<number> {
    return await this.userService.myUserId((req.user as JwtPayload).thirdPartyId);
  }

  //idに対応したユーザを検索
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

  //idに対応したユーザをフォローする
  @Post('v1/follow/:id')
  @UseGuards(AuthGuard('jwt'))
  async follow(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<FollowResult> {
    return await this.userService.follow(
      (req.user as JwtPayload).thirdPartyId,
      id,
    );
  }

  //idに対応するユーザのフォローリストを返す
  @Get('v1/:id/follows')
  async follows(@Param('id') id: number): Promise<FollowUserInfo[]> {
    return await this.userService.follows(id);
  }


}
