
   




<template>
  <v-card>
    <v-toolbar
      dark
      dense
    >
      <v-icon>mdi-arrow-left</v-icon>
      <v-spacer />
      <v-btn
        icon
        flat
        @click="onClickBack"
      />

      <v-toolbar-title>アカウント削除</v-toolbar-title>
    </v-toolbar>

    <v-card-title class="justify-center">
      <p class="font-weight-black">
        OICity アカウント削除の確認！
      </p>
    </v-card-title>
    <v-card height="100%">
      <p>Do you reallyu wakdsfkjdskfjdskfjksdjfkdsjfkjkfkdsjfklsdfkldfkdsfjkdsfjkjkjkjk</p>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          :append-icon="show3 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show3 ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 8 characters"
          value="wqfasds"
          class="input-group--focused"
          @click:append="show3 = !show3"
        />
      </v-col>

      <div class="text-center">
        <v-col>
          <v-btn
            rounded
            color="error"
            dark
            ma-2
          >
            削除
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            ma-2
            rounded
            color="success"
            dark
          >
            キャンセル
          </v-btn>
        </v-col>
      </div>
    </v-card>
  </v-card>
</template>


<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  onClickBack() {
    this.$router.back();
  }

  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  }
}
</script>