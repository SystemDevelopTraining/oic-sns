import { LoginApplication }from '../application/LoginApplication';
import {  LoginRepositoryImpl }from '../infrastructure/login/LoginRepositoryImpl';
import { LoginServiceImpl }from '../infrastructure/login/LoginServiceImpl';
import { PwaChecker }from '../utils/PwaChecker';
import { LoginRepositoryForPwaImpl }from '../infrastructure/login/LoginRepositoryForPwaImpl';

export function CreateLoginApplication(): LoginApplication {
  return new LoginApplication(
    PwaChecker.isPwa ? new LoginRepositoryForPwaImpl() : new LoginRepositoryImpl(),
    new LoginServiceImpl()
    );
}
