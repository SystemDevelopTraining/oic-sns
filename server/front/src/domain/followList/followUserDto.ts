import { UserId }from '../user/UserId';

export interface FollowUserDto {
  name: string;
  isFollow:boolean;
  id: UserId;
}
