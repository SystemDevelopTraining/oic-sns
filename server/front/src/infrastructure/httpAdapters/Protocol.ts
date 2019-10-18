import { Sex }from '../../domain/user/Sex';

export interface User {
  id: number;
  name: string;
  sex: Sex;
  oicNumber: string;
  birthday: string;
  note: string;
  googleProfileld: string;
}
export interface CreateUserParams {
  name: string;
  sex: Sex;
  jwt: string;
}
