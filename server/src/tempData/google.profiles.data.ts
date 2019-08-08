import { Profile } from 'passport-google-oauth';

// 一時的にProfileを保存する
class GoogleProfilesData {
  private static profiles = new Map<string, Profile>();

  // Profileを保存する
  static saveProfile(profile: Profile) {
    GoogleProfilesData.profiles.set(profile.id, profile);
  }

  // ProfileのIdからProfileを取得する
  static getProfile(id: string): Profile {
    return GoogleProfilesData.profiles.get(id);
  }
}
