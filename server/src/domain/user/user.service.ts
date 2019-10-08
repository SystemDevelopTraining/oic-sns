import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Following } from '../entities/following.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { FollowResult } from './response/follow-result';
import { FollowUserInfo } from './response/follow-user-info';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>,
  ) {}

  async create(userDto: UserDto, googleProfileId: string): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.note = userDto.note;
    user.sex = userDto.sex;
    user.oicNumber = userDto.oicNumber;
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

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

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

  async follows(id: number): Promise<FollowUserInfo[]> {
    const user = await this.userRepository.findOne(id, {
      relations: ['followings', 'followers'],
    });

    const follows = user.followings;
    const follows2 = follows.map(async x => {
      const { id, name } = await x.followeeUser;
      return { name, id };
    });
    return Promise.all(follows2);
  }
}
