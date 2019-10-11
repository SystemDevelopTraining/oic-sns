import { Sex } from './Sex';

//ユーザを作成する時に必要となるデータ
export interface MakeUserDto {
  name: string;
  sex: Sex;
}
