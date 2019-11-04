<template>
  <!--dialog box-->
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="red"
        dark
        small
        fixed
        top
        right
        fab
        v-on="on"
      >
        <v-icon>
          fas
          fa-sign-out-alt
        </v-icon>
      </v-btn>
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
import { CreateLoginInfoApplication }from '../create/CreateLoginInfoApplication';

@Component({})
export default class extends Vue {
  dialog = false;
  onLogoutClick() {
    CreateLoginInfoApplication().ClearJwt();
    location.href = '/';
  }
}
</script>