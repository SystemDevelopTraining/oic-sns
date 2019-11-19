<template>
  <div>
    <template v-if="isLogin">
      <v-btn
        color="primary"
        dark
        small
        fixed
        top
        app
        fab
        right
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-chevron-triple-up</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginApplication }from '../create/CreateLoginApplication';

@Component({ components: {} })
export default class extends Vue {
  isLogin = CreateLoginApplication().IsLogin();
}
</script>




