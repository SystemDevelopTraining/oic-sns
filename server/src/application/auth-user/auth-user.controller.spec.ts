import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserController } from './auth-user.controller';
import { UserExistService } from '../../domain/auth-user/services/user-exist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

describe('AuthUser Controller', () => {
  let controller: AuthUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthUserController],
      providers: [
        UserExistService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthUserController>(AuthUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
