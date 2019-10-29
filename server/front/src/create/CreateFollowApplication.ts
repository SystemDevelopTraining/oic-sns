import { FollowApplication }from '../application/FollowApplication';
import { FollowRepositoryImpl }from '../infrastructure/follow/FollowRepositoryImpl';

export function CreateFollowApplication(){
    return new FollowApplication(new FollowRepositoryImpl());
}