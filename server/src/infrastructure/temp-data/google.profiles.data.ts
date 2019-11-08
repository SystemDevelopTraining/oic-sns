import { Profile } from 'passport-google-oauth';
import { GoogleProfilesRepository } from '../../domain/google-profiles.repository';
import { Injectable } from '@nestjs/common';
import { MyGoogleProfileDto } from '../../../front/src/domain/user/MyGoogleProfileDto';

// 一時的にProfileを保存する
@Injectable()
export class GoogleProfilesData implements GoogleProfilesRepository {
  private static profiles = new Map<string, Profile>();

  saveProfile(profile: Profile): void {
    GoogleProfilesData.profiles.set(profile.id, profile);
  }
  getProfile(id: string): MyGoogleProfileDto {
    const profile = GoogleProfilesData.profiles.get(id);
    return { email: profile.emails[0].value, oicNumber: profile.emails[0].value.substr(0, 5) }
  }
}
