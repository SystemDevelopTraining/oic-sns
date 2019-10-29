import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Following } from '../entities/following.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserDto as FrontUserDto } from '../../../front/src/domain/user/UserDto';
import { FollowResult } from './response/follow-result';
import { MyUserResponse } from './response/my-user-responcse';
import { GoogleProfilesRepository } from '../google-profiles.repository';
import { FollowUserDto } from '../../../front/src/domain/follow_list/followUser.dto';
import { FollowListDto } from '../../../front/src/domain/follow_list/followList.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('GoogleProfilesRepository')
    private readonly googleProfilesRepository: GoogleProfilesRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>,
  ) {}

  //ユーザ作成
  async create(userDto: UserDto, googleProfileId: string): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.note = userDto.note;
    user.sex = userDto.sex;
    user.oicNumber = this.googleProfilesRepository
      .getProfile(googleProfileId)
      .emails[0].value.substr(0, 5);
    user.googleProfileId = googleProfileId;
    user.birthday = userDto.birthday;
    try {
      return await this.userRepository.save(user);
    } catch (e) {
      switch (e.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            'そのユーザーは既に存在しています',
            HttpStatus.BAD_REQUEST,
          );
        case 'ER_NO_DEFAULT_FOR_FIELD':
          throw new HttpException(
            '情報が不足しています',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  //ユーザの検索
  async findById(id: number, googleProfileId: string): Promise<FrontUserDto> {
    const user = await this.userRepository.findOne(id);
    try {
      return {
        id: { id: user.id },
        name: user.name,
        sex: user.sex,
        note: user.note,
        oicNumber: user.oicNumber,
        birthday: user.birthday && user.birthday.toDateString(),
        isMyself: user.googleProfileId === googleProfileId,
      };
    } catch (e) {
      throw new HttpException('ユーザが見つかりません', HttpStatus.BAD_REQUEST);
    }
  }

  //ユーザのフォロー、アンフォロー
  async follow(
    googleProfileId: string,
    targetId: number,
  ): Promise<FollowResult> {
    const following = new Following();
    following.followUser = this.userRepository.findOne({ googleProfileId });
    following.followeeUser = this.userRepository.findOne(targetId);

    if (
      await this.followingRepository.count({
        followUser: following.followUser,
        followeeUser: following.followeeUser,
      })
    ) {
      this.followingRepository.remove(following);
      return { isFollow: false };
    }
    this.followingRepository.save(following);
    return { isFollow: true };
  }

  //idに合致するユーザのフォローリストを返す
  async follows(id: number): Promise<FollowListDto> {
    const user = await this.userRepository.findOne(id, {
      relations: ['followings', 'followers'],
    });

    const follows = user.followings;
    const promiseFollowUserInfos = follows.map(async x => {
      const { id, name } = await x.followeeUser;
      return { name, id };
    });
    return {
      followers: await Promise.all(promiseFollowUserInfos).then(xs =>
        xs.map(x => {
          return { name: x.name, id: { id: x.id } };
        }),
      ),
    };
  }

  async myUserId(googleProfileId: string): Promise<MyUserResponse> {
    const user = await this.userRepository.findOne({ googleProfileId });
    try {
      return { id: user.id };
    } catch (e) {
      throw new HttpException('ユーザが見つかりません', HttpStatus.NOT_FOUND);
    }
  }
}
