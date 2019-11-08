import { LoginApplication }from '../application/LoginApplication';
import {  LoginRepositoryImpl }from '../infrastructure/login/LoginRepositoryImpl';
import { LoginServiceImpl }from '../infrastructure/login/LoginServiceImpl';

export function CreateLoginApplication(): LoginApplication {
  return new LoginApplication(new LoginRepositoryImpl(),new LoginServiceImpl());
}
