import { Injectable } from '@nestjs/common';
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

  create(userDto: UserDto) {
    const user = new User();
    user.name = userDto.name;
    user.note = userDto.note;
    user.sex = userDto.sex;
    user.studentsNumber = userDto.studentsNumber;
    user.googleProfileId = userDto.googleProfileId;
    user.birthday = userDto.birthday;
    this.userRepository.save(user);
  }
}
