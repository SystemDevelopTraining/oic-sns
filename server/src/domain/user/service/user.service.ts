import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Following } from '../../entities/following.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../user.dto';
import { UserDto as FrontUserDto } from '../../../../front/src/domain/user/UserDto';
import { MyUserResponse } from '../response/my-user-responcse';
import { GoogleProfilesRepository } from '../../google-profiles.repository';
import { FollowResult } from '../../../../front/src/domain/follow/FollowResult';
import { FollowListDto } from '../../../../front/src/domain/followList/followListDto';
import { FollowUserDto } from '../../../../front/src/domain/followList/followUserDto';
import { MyGoogleProfileDto } from '../../../../front/src/domain/user/MyGoogleProfileDto';
import { UpdateUserDto } from '../update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('GoogleProfilesRepository')
    private readonly googleProfilesRepository: GoogleProfilesRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>,
  ) { }

  //ユーザ作成
  async create(userDto: UserDto, googleProfileId: string): Promise<User> {
    const googleProfile = this.googleProfilesRepository.getProfile(googleProfileId)
    const user = new User();
    user.name = userDto.name;
    user.email = googleProfile.email
    user.note = userDto.note;
    user.sex = userDto.sex;
    user.classNumber = "2A23KS";
    user.schoolYear = 1;
    user.studySubjectId = 1;
    user.courseId = 1;
    user.oicNumber = googleProfile.oicNumber;
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

  //ユーザの更新
  async updateMyUser(googleProfileId: string, updateMyUserDto: UpdateUserDto): Promise<unknown> {
    let updateProps = {
      name: updateMyUserDto.name,
      birthday: updateMyUserDto.birthday,
      note: updateMyUserDto.note,
      schoolYear: updateMyUserDto.schoolYear,
      license: updateMyUserDto.license,
      githubUrl: updateMyUserDto.githubUrl,
      twitterUrl: updateMyUserDto.twitterUrl,
      homePageUrl: updateMyUserDto.homePageUrl,
      classNumber: updateMyUserDto.classNumber,
      courseId: updateMyUserDto.courseId && updateMyUserDto.courseId.id,
      studySubjectId: updateMyUserDto.studySubjectId && updateMyUserDto.studySubjectId.id
    }
    Object.keys(updateProps).forEach(k => {
      if (updateProps[k] === undefined) delete updateProps[k]
    })
    return this.userRepository.update(
      { googleProfileId }, updateProps
    )
  }

  //ユーザの検索
  async findById(id: number, googleProfileId: string): Promise<FrontUserDto> {
    const user = await this.userRepository.findOne(id, { relations: ["course", "studySubject"] });
    const myUser = await this.userRepository.findOne({ googleProfileId });

    try {
      return {
        id: { id: user.id },
        name: user.name,
        email: user.email,
        sex: user.sex,
        note: user.note,
        oicNumber: user.oicNumber,
        birthday: user.birthday && user.birthday.toDateString(),
        isMyself: user.googleProfileId === googleProfileId,
        classNumber: user.classNumber,
        schoolYear: user.schoolYear,
        license: user.license,
        course: user.course.name,
        studySubject: user.studySubject.name,
        githubUrl: user.githubUrl,
        twitterUrl: user.twitterUrl,
        homePageUrl: user.homePageUrl,
        isFollow:
          (await this.followingRepository.count({
            followUserId: myUser.id,
            followeeUserId: user.id,
          })) !== 0,
      };
    } catch (e) {
      throw new HttpException('ユーザが見つかりません', HttpStatus.BAD_REQUEST);
    }
  }

  //ユーザ削除
  async deleteMyUser(googleProfileId: string) {
    await this.userRepository.delete({ googleProfileId })
    return { success: true };
  }

  //ユーザのフォロー、アンフォロー
  async follow(
    googleProfileId: string,
    targetId: string,
  ): Promise<FollowResult> {
    const followUser = await this.userRepository.findOne({
      googleProfileId,
    });
    if (followUser.id === Number(targetId)) {
      throw new HttpException(
        '自分自身をフォローできません',
        HttpStatus.BAD_REQUEST,
      );
    }
    const followeeUser = await this.userRepository.findOne(targetId);
    const followings = await this.followingRepository.find({
      followUserId: followUser.id,
      followeeUserId: followeeUser.id,
    });

    if (followings.length !== 0) {
      await this.followingRepository.remove(followings[0]);
      return { isFollow: false };
    }
    const following = new Following();
    following.followUser = Promise.resolve(followUser);
    following.followeeUser = Promise.resolve(followeeUser);
    await this.followingRepository.save(following);
    return { isFollow: true };
  }

  //idに合致するユーザのフォローリストを返す
  async follows(id: number, googleProfileId: string): Promise<FollowListDto> {
    const myUserId = await this.myUserId(googleProfileId);
    const myUserFollowings = await this.followingRepository.find({
      followUserId: myUserId.id,
    });
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
        xs.map<FollowUserDto>(x => {
          return {
            name: x.name,
            id: { id: x.id },
            isFollow: myUserFollowings.some(y => y.followeeUserId === x.id),
          };
        }),
      ),
    };
  }

  async myUserId(googleProfileId: string): Promise<MyUserResponse> {
    const user = await this.userRepository.findOne({ googleProfileId });
    try {
      return { id: user.id };
    } catch (e) {
      throw new HttpException('ユーザが見つかりません', HttpStatus.UNAUTHORIZED);
    }
  }

  async getMyGoogleProfile(googleProfileId: string): Promise<MyGoogleProfileDto> {
    const profile = await this.googleProfilesRepository.getProfile(googleProfileId);
    try {
      return profile;
    } catch (e) {
      throw new HttpException('ユーザが見つかりません', HttpStatus.NOT_FOUND);
    }
  }
}
