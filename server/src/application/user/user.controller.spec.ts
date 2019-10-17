import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../domain/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Following } from '../../domain/entities/following.entity';
import { GoogleProfilesData } from '../../infrastructure/temp-data/google.profiles.data';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'GoogleProfilesRepository',
          useClass: GoogleProfilesData,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Following),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
