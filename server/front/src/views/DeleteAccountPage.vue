<template>
  <v-form v-model="haha">
    <v-card>
      <v-toolbar
        dark
        dense
      >
        <back-btn />

        <v-toolbar-title>アカウント削除</v-toolbar-title>
      </v-toolbar>
      <v-card height>
        <v-card-title class="justify-center">
          <p class="font-weight-black">
            OICity アカウント削除の確認
          </p>
        </v-card-title>
        <v-card-text class="justify-center">
          アカウントを削除すると元に戻すことができません。投稿もすべて削除されます。確認の為、学籍番号を入力してください。
        </v-card-text>
        <v-container class="grey lighten-5">
          <v-row
            align="start"
            justify="center"
          >
            <v-col align-self="end">
              <v-text-field
                label="学籍番号"
                outlined
                clearable
                :placeholder="oicNumber"
                :rules="oicNumberRules"
              />
              <v-btn
                tile
                color="red"
                dark
                :disabled="!haha"
              >
                アカウントを削除
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import BackBtn from '../components/BackBtn.vue';
import { CreateUserApplication }from '../create/CreateUserApplication';
@Component({
  components: { BackBtn },
})
export default class extends Vue {
  oicNumber: string = '';
  //get OICNumberのためにhahaとoicN作った
  haha = true;
  oicN: string[] = [];
  async created() {
    const myUser = await CreateUserApplication().GetMyUser();
    this.oicNumber = myUser.oicNumber;
    this.oicN = myUser.oicNumber.split('b');
  }
  //get OICNumber
  get oicNumberRules() {
    return [
      (x: string) =>
        x === this.oicNumber ||
        x === 'B' + this.oicN[1] ||
        '正しく学籍番号を入力してください！',
    ];
  }
}
</script>
