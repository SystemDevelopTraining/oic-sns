import { FollowListApplication }from '../application/FollowListApplication';
import { FollowListApplicationImpl }from '../infrastructure/followList/FollowListReposioryImpl';

export function CreateFollowListApplication() {
  return new FollowListApplication(new FollowListApplicationImpl());
}
