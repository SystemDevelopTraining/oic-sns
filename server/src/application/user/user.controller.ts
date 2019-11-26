import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from '../../domain/user/service/user.service';
import { MakeUserDto } from '../../domain/user/make-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../../domain/auth-user/jwt.payload';
import { MyUserResponse } from '../../domain/user/response/my-user-responcse';
import { UserDto as FrontUserDto } from '../../../front/src/domain/user/UserDto';
import { FollowResult } from '../../../front/src/domain/follow/FollowResult';
import { FollowListDto } from '../../../front/src/domain/followList/followListDto';
import { MyGoogleProfileDto } from '../../../front/src/domain/user/MyGoogleProfileDto';
import { UpdateUserDto } from '../../domain/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //ユーザ作成
  @Post('v1')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() makeUserDto: MakeUserDto,
    @Req() req: Request,
  ): Promise<number> {
    return await this.userService
      .create(makeUserDto, (req.user as JwtPayload).thirdPartyId)
      .then(x => x.id);
  }

  //自身のユーザidを返す
  @Get('v1/my_user')
  @UseGuards(AuthGuard('jwt'))
  async myUserId(@Req() req: Request): Promise<MyUserResponse> {
    return await this.userService.myUserId(
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  //自身のグーグル情報を返す
  @Get('v1/my_user_google_profile')
  @UseGuards(AuthGuard('jwt'))
  async getMyGoogleProfile(@Req() req: Request): Promise<MyGoogleProfileDto> {
    return await this.userService.getMyGoogleProfile(
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  //idに対応したユーザを検索
  @Get('v1/:id')
  @UseGuards(AuthGuard('jwt'))
  async findById(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<FrontUserDto> {
    return await this.userService.findById(
      id,
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  @Patch('v1/my_user')
  @UseGuards(AuthGuard('jwt'))
  async updateMyUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return await this.userService.updateMyUser(
      (req.user as JwtPayload).thirdPartyId,
      updateUserDto,
    );
  }

  @Delete('v1/my_user')
  @UseGuards(AuthGuard('jwt'))
  async deleteMyUser(@Req() req: Request) {
    return await this.userService.deleteMyUser(
      (req.user as JwtPayload).thirdPartyId,
    );
  }

  //idに対応したユーザをフォローする
  @Post('v1/follow/:id')
  @UseGuards(AuthGuard('jwt'))
  async follow(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<FollowResult> {
    return await this.userService.follow(
      (req.user as JwtPayload).thirdPartyId,
      id,
    );
  }

  //idに対応するユーザのフォローリストを返す
  @Get('v1/:id/follows')
  @UseGuards(AuthGuard('jwt'))
  async follows(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<FollowListDto> {
    return await this.userService.follows(
      id,
      (req.user as JwtPayload).thirdPartyId,
    );
  }
}
