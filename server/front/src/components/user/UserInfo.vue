<template>
  <v-card
    v-if="user"
    class="mx-auto"
    outlined
    @click="onClickShowUserDetails"
  >
    <v-img
      src="/back.jpg"
      aspect-ratio="1.7"
      cover
    >
      <div
        class="mt-6"
        align="center"
      >
        <v-row
          type="flex"
          class="row-bg"
          justify="center"
        >
          <v-col>
            <div class="grid-content">
              <v-avatar
                color="secondary"
                size="80"
              >
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-container
        fluid
        class="center"
      >
        <v-row
          justify="center"
          class="display-1 font-weight-black"
        >
          {{ name }}
        </v-row>
        <v-row>
          <v-col align="right">
            <v-btn
              v-if="isOtherUser"
              large
              rounded
              max-width="120"
              :outlined="!isfollowed"
              color="accent"
              @click.stop="onFollowClick"
            >
              {{ followText }}
            </v-btn>
            <v-btn
              v-if="isMyUser"
              max-width="130"
              rounded
              large
              color="accent"
              @click.stop="editProfileClick"
            >
              プロフィール編集
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              max-width="120"
              large
              rounded
              color="accent"
              @click="onClickFollowList"
            >
              フォローリスト
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="showUserDetails||isXlSize">
          <div class="text-center">
            <!-- chip's roop -->
            <v-chip
              v-for="oneUserInfo in oneUserInfoArray"
              :key="oneUserInfo.label"
              class="ma-2"
              color="secondary"
              label
              @click.stop
            >
              <div v-if="oneUserInfo.isLink">
                {{ oneUserInfo.label }}:
                <a
                  class="accent--text"
                  :href="oneUserInfo.value"
                >{{ oneUserInfo.value }}</a>
              </div>

              <div v-else>
                {{ oneUserInfo.label }}:{{ oneUserInfo.value }}
              </div>
            </v-chip>
          </div>
          <v-divider
            class="mx-4"
            :inset="inset"
          />
          <div class="mt-5 text-left">
            <div>
              <font
                size="3"
                class="secondary--text"
              >
                自己紹介：
              </font>
            </div>
            {{ note }}
          </div>
        </div>
      </v-container>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }from 'vue-property-decorator';
import { UserDto }from '~/src/domain/user/UserDto';
import { AsyncOnce }from '../../utils/AsyncOnce';
import { CreateFollowApplication }from '../../create/CreateFollowApplication';

interface OneOfUserInfo {
  label: string;
  value: string;
  //chipはlinkかどうか
  isLink: boolean;
}

@Component({ components: {} })
export default class extends Vue {
  showUserDetails = false;
  isfollowed = false;
  asyncOnce = new AsyncOnce();

  @Prop({ type: Object, required: true }) user!: UserDto;

  followText: 'フォロー' | 'フォロー解除' = 'フォロー';

  get oneUserInfoArray() {
    const info: OneOfUserInfo[] = [
      { label: '学籍番号', value: this.user.oicNumber, isLink: false },
      {
        label: '生年月日',
        value:
          (this.user.birthday &&
            this.user.birthday.substr(0, 10).replace(/-/g, '/')) ||
          '',
        isLink: false,
      },
      { label: '性別', value: this.user.sex, isLink: false },
      { label: '資格', value: this.user.license, isLink: false },
      { label: '学年', value: this.user.schoolYear + '年', isLink: false },
      { label: 'クラス番号', value: this.user.classNumber, isLink: false },
      { label: '学科', value: this.user.studySubject, isLink: false },
      { label: '専攻', value: this.user.course, isLink: false },
      { label: 'ホームページ', value: this.user.homePageUrl, isLink: true },
      { label: 'Twitter', value: this.user.twitterUrl, isLink: true },
      { label: 'GitHub', value: this.user.githubUrl, isLink: true },
      { label: 'E-mail', value: this.user.email, isLink: false },
    ];
    return info.filter(x => x.value !== '');
  }

  get isXlSize() {
    return ['lg', 'xl', 'md'].some(x => x === this.$vuetify.breakpoint.name);
  }

  created() {
    this.setFollowText(this.user.isFollow);
  }

  @Watch('user')
  async onChangeUser() {
    this.setFollowText(this.user.isFollow);
  }

  setFollowText(isFollow: boolean) {
    this.followText = isFollow ? 'フォロー解除' : 'フォロー';
    this.isfollowed = this.followText === 'フォロー解除';
  }

  get isOtherUser() {
    return this.user.isMyself === false;
  }

  get isMyUser() {
    return this.user.isMyself === true;
  }

  get name() {
    return this.user.name;
  }

  get note() {
    return this.user.note;
  }

  onClickFollowList() {
    this.$router.push({ name: 'followList' });
  }

  onClickShowUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }

  onFollowClick() {
    this.asyncOnce.Do(this.follow);
  }

  async follow() {
    const result = await CreateFollowApplication().FollowOrUnfollow(
      this.user.id,
    );

    this.setFollowText(result.isFollow);
  }
  editProfileClick() {
    this.$router.push({ name: 'editProfile' });
  }
}
</script>
