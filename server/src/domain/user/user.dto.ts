import { sex } from './user.sex';

export interface UserDto {
    name: string;
    sex: sex;
    studentsNumber: string;
    birthday: Date;
    note: string;
    googleProfileId: string;
}
