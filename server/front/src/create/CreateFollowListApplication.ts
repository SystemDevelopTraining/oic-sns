import { FollowListApplication }from '../application/FollowListApplication';
import { FollowListApplicationImpl }from '../infrastructure/follow-list/FollowListReposioryImpl';

export function CreateFollowListApplication() {
  return new FollowListApplication(new FollowListApplicationImpl());
}
