import { UserApplication }from '../application/UserApplication';
import { UserRepositoryimpl }from '../infrastructure/user/UserRepositoryImpl';

export function CreateUserApplication(): UserApplication {
  return new UserApplication(new UserRepositoryimpl());
}
