<template>
  <v-card>
    <v-toolbar
      dark
      dense
    >
      <back-btn />
      <v-spacer />
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
            />
            <v-btn
              tile
              color="red"
              dark
              @click="deleteAccount"
            >
              アカウントを削除
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import BackBtn from '../components/BackBtn.vue';

@Component({
  components: { BackBtn },
})
export default class extends Vue {
  clickDeleteAccount() {
    location.href = '/';
  }
}
</script>
