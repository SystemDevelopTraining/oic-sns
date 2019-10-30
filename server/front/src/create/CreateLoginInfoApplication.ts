import { LoginApplication }from '../application/LoginApplication';
import { LoginInfoRepositoryImpl }from '../infrastructure/login/LoginInfoRepositoryImpl';
import { LoginServiceImpl }from '../infrastructure/login/LoginServiceImpl';

export function CreateLoginInfoApplication(): LoginApplication {
  return new LoginApplication(new LoginInfoRepositoryImpl(),new LoginServiceImpl());
}
