import { Profile } from 'passport-google-oauth';
import { MyGoogleProfileDto } from '../../front/src/domain/user/MyGoogleProfileDto';

// GoogleProfileを保存する
export interface GoogleProfilesRepository {
  // Profileを保存する
  saveProfile(profile: Profile): void;

  // ProfileのIdからProfileを取得する
  getProfile(id: string): MyGoogleProfileDto;
}
