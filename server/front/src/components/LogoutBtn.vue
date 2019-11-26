<template>
  <!--dialog box-->
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template
      v-slot:activator="{ on }"
      v-slot:append
    >
      <div class="pa-2">
        <v-btn
          color="red"
          dark
          block=""
          v-on="on"
        >
          Logout
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title class="headline">
        ログアウトしますか？
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          いいえ
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="onLogoutClick"
        >
          はい
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginApplication }from '../create/CreateLoginApplication';

@Component({})
export default class extends Vue {
  dialog = false;
  onLogoutClick() {
    CreateLoginApplication().ClearJwt();
    location.href = '/';
  }
}
</script>