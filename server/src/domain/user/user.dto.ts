import { Sex } from './user.sex';

export interface UserDto {
    name: string;
    sex: Sex;
    oicNumber: string;
    birthday: Date;
    note: string;
}
