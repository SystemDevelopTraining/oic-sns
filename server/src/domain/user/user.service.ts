import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto, googleProfileId: string): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.note = userDto.note;
    user.sex = userDto.sex;
    user.oicNumber = userDto.oicNumber;
    user.googleProfileId = googleProfileId;
    user.birthday = userDto.birthday;
    try{
      return await this.userRepository.save(user);
    } catch (e) {
      switch(e.code){
      case 'ER_DUP_ENTRY':
        throw new HttpException('そのユーザーは既に存在しています', HttpStatus.BAD_REQUEST);
      case 'ER_NO_DEFAULT_FOR_FIELD':
        throw new HttpException('情報が不足しています', HttpStatus.BAD_REQUEST);
      }
    }
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
