import { Profile } from 'passport-google-oauth';

// GoogleProfileを保存する
export interface GoogleProfilesRepository {
  // Profileを保存する
  saveProfile(profile: Profile): void;

  // ProfileのIdからProfileを取得する
  getProfile(id: string): Profile;
}
