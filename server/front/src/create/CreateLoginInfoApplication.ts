import { LoginApplication } from '../application/LoginApplication';
import { LoginInfoRepositoryImpl } from '../infrastructure/login/LoginInfoRepositoryImpl';

export function CreateLoginInfoApplication(): LoginApplication {
  return new LoginApplication(new LoginInfoRepositoryImpl());
}
