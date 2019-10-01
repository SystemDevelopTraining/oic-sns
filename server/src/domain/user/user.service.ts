import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { JwtPayload } from '../auth-user/jwt.payload';

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
    return this.userRepository.save(user);
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
