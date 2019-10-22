import { Sex }from './Sex';
import { UserId }from './UserId';

export interface UserDto {
  id: UserId;
  name: string;
  sex: Sex;
  oicNumber: string;
  birthday?: string;
  note: string;
  //自分自身かどうか
  isMyself: boolean;
}
