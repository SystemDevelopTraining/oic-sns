import { Sex }from './Sex';

export interface UserDto {
    id: number;
    name: string;
    sex: Sex;
    oicNumber: string;
    birthday: string;
    note: string;
  }