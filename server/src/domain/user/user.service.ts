import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Following } from '../entities/following.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { FollowResult } from './response/follow-result';
import { FollowUserInfo } from './response/follow-user-info';
import { MyUserResponse } from './response/my-user-responcse';
import { FindUserResponse } from './response/find-user-response';
import { GoogleProfilesRepository } from '../google-profiles.repository';

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
  async findById(
    id: number,
    googleProfileId: string,
  ): Promise<FindUserResponse> {
    const user = await this.userRepository.findOne(id);
    try {
      if (user.googleProfileId === googleProfileId) {
        return { isMyself: true, user };
      } else {
        return { isMyself: false, user };
      }
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
  async follows(id: number): Promise<FollowUserInfo[]> {
    const user = await this.userRepository.findOne(id, {
      relations: ['followings', 'followers'],
    });

    const follows = user.followings;
    const promiseFollowUserInfos = follows.map(async x => {
      const { id, name } = await x.followeeUser;
      return { name, id };
    });
    return Promise.all(promiseFollowUserInfos);
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
