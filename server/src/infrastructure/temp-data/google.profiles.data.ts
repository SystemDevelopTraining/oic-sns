import { Profile } from 'passport-google-oauth';
import { GoogleProfilesRepository } from '../../domain/google-profiles.repository';
import { Injectable } from '@nestjs/common';

// 一時的にProfileを保存する
@Injectable()
export class GoogleProfilesData implements GoogleProfilesRepository {
  private static profiles = new Map<string, Profile>();

  saveProfile(profile: Profile): void {
    GoogleProfilesData.profiles.set(profile.id, profile);
  }
  getProfile(id: string): Profile {
    return GoogleProfilesData.profiles.get(id);
  }
}
