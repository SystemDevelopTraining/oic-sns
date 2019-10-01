import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserExistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //googleProfileIdが一致するユーザが存在するか
  isExistUser(googleProfileId: string): Promise<boolean> {
    return this.userRepository.count({ googleProfileId }).then(c => c > 0);
  }
}
