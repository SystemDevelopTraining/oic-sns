import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import { sex } from '../entities/sex';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create() {
    const user = new User();
    user.name = 'pp';
    user.note = 'hoge';
    user.sex = sex.man;
    user.studentsNumber = 'bbbb';
    user.gogleProfileId = 'aa';
    user.birthday = new Date();
    this.userRepository.save(user);
  }
}
