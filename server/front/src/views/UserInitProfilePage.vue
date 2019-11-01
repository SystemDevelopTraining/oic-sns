<template>
  <v-card
    class="mx-auto d-flex flex-column"
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
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        label="本名"
        :rules="nameRules"
        counter="25"
      />
      <v-select
        v-model="sex"
        :rules="requiredRules"
        label="性別"
        :items="['男','女']"
      />
      <v-select
        v-model="subject"
        :rules="requiredRules"
        label="学科"
        :items="[
          '総合情報メディア学科','情報システム開発学科',
          '情報処理学科','ITテクニカル学科',
          'ITビジネス学科','総合情報メディア学科',
          'メディアクリエイト学科','メディアデザイン学科',
          'メディアクリエイト学科','メディアデザイン学科'
        ]"
        required
      />
      <v-select
        v-model="major"
        :rules="requiredRules"
        label="専攻"
        :items="['A','B']"
      />
      <v-select
        v-model="grade"
        :rules="requiredRules"
        label="学年"
        :items="['1年','2年','3年','4年']"
      />
      <v-text-field
        v-model="classNumber"
        label="クラス番号"
        :rules="classNumberRules"
        counter="6"
      />
    </v-form>
    <div class="mt-auto pa-3">
      <v-btn
        large
        width="100"
        :disabled="!valid"
        @click="onClickRegister"
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
import { AsyncOnce }from '../utils/AsyncOnce';
@Component({})
export default class extends Vue {
  private name: string = '';
  private sex: Sex = Sex.man;
  private subject: string = '';
  private major: string = '';
  private grade: number = 0;
  private classNumber: string = '';
  private asyncOnce = new AsyncOnce();

  created() {
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') CreateLoginInfoApplication().SaveJwt(jwt);
  }

  nameRules = [
    (v: string) => !!v || '本名を入力してください',
    (v: string) => v.length <= 25 || '25文字以内で入力してください',
    (value: string) => {
      const pattern = /^\S/;
      return pattern.test(value) || '正しい本名を入力してください';
    },
  ];
  requiredRules = [(v: string) => !!v || '選択してください'];

  classNumberRules = [
    (v: string) => !!v || 'クラス番号を入力してください',
    (v: string) => v.length <= 6 || '6文字以内で入力してください',
    (value: string) => {
      const pattern = /^[1-4][A-Z][0-9]{2}[A-Z]{2}/;
      return pattern.test(value) || '正しいクラス番号を入力してください';
    },
  ];

  valid = true;

  onClickRegister() {
    this.asyncOnce.Do(this.register);
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