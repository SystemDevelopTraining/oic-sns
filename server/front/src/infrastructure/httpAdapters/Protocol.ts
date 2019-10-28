import { Sex }from '../../domain/user/Sex';

export interface CreateUserParams {
  name: string;
  sex: Sex;
  jwt: string;
}
