<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="600"
    height="100%"
  >
    <v-card-title class="mx-auto">
      初期プロフィール設定ページ
    </v-card-title>
    <v-card outlined>
      <v-img
        class="mx-auto"
        width="100px"
        height="100px"
        src="user_photo.png"
      />
    </v-card>
    <v-form>
      <v-text-field
        v-model="name"
        label="本名"
      />
      <v-select
        v-model="sex"
        label="性別"
        :items="['男','女']"
      />
    </v-form>
    <div class="mt-auto pa-3">
      <v-btn
        large
        width="100"
        @click="register"
      >
        登録
      </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { Sex }from '../domain/user/Sex';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';
@Component({})
export default class extends Vue {
  private name: string = '';
  private sex: Sex = Sex.man;
  created() {
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') CreateLoginInfoApplication().SaveJwt(jwt);
  }

  async register() {
    try {
      await CreateUserApplication().MakeUser({
        name: this.name,
        sex: this.sex,
      });
      this.$router.push({ name: 'timeline' });
    }catch {
      alert('ユーザ作成に失敗しました');
    }
  }
}
</script>