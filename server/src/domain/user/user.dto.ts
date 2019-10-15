import { Sex } from './user.sex';

export interface UserDto {
  name: string;
  sex: Sex;
  birthday?: Date;
  note: string;
}
