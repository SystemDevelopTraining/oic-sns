<template>
  <v-card
    v-if="user"
    class="mx-auto"
    outlined
    @click="onClickShowUserDetails"
  >
    <logout-btn />
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
              color="grey"
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
            :color="followBtnColor"
            @click="onFollowClick"
          >
            {{ followText }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="isMyUser"
            max-width="130"
            rounded
            large
            color="#F18D9E"
            @click="editProfileClick"
          >
            プロフィール編集
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            max-width="120"
            rounded
            large
            color="yellow"
            @click="onClickFollowList"
          >
            フォローリスト
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="showUserDetails">
        <div class="text-center">
          <v-chip
            class="ma-2"
            label
          >
            学籍番号：{{ oicNumber }}
          </v-chip>
          <v-chip
            class="ma-2"
            label
          >
            {{ birthday }}
          </v-chip>
          <v-chip label>
            {{ sex }}
          </v-chip>
        </div>

        <div class="mt-5 text-center">
          {{ note }}
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }from 'vue-property-decorator';
import { UserDto }from '~/src/domain/user/UserDto';
import { AsyncOnce }from '../../utils/AsyncOnce';
import { CreateFollowApplication }from '../../create/CreateFollowApplication';

import LogoutBtn from '../LogoutBtn.vue';

@Component({ components: { LogoutBtn } })
export default class extends Vue {
  showUserDetails = false;
  followBtnColor = 'yellow';
  asyncOnce = new AsyncOnce();

  @Prop({ type: Object, required: true }) user!: UserDto;

  followText: 'フォロー' | 'フォロー解除' = 'フォロー';

  created() {
    this.setFollowText(this.user.isFollow);
  }

  @Watch('user')
  async onChangeUser() {
    this.setFollowText(this.user.isFollow);
  }

  setFollowText(isFollow: boolean) {
    this.followText = isFollow ? 'フォロー解除' : 'フォロー';
    if (this.followText === 'フォロー解除') {
      this.followBtnColor = 'red';
    }else {
      this.followBtnColor = 'yellow';
    }
  }

  get isOtherUser() {
    return this.user === null ? false : this.user.isMyself === false;
  }

  get isMyUser() {
    return this.user === null ? true : this.user.isMyself === true;
  }

  get name() {
    return this.user === null ? '' : this.user.name;
  }

  get sex() {
    return this.user === null ? '' : this.user.sex;
  }

  get birthday() {
    return this.user === null ? '' : this.user.birthday;
  }

  get note() {
    return this.user === null ? '' : this.user.note;
  }

  get oicNumber() {
    return this.user === null ? '' : this.user.oicNumber;
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