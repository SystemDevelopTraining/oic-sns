<template>
  <v-container>
    <p
      style="font-family : 'Lucida HandWriting' ;font-size:50px; color: red"
      class="text-center font-weight-bold"
    >
      Welcome
      <br>To <br>OiCity
    </p>
    <v-row />
    <!--<v-row><v-img src="oic.jpg" /></v-row>-->
    <div>
      <v-img
        v-if="isNotLogin()"
        src="google_btn.png"
        align="end"
        @click="onLogin"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateLoginApplication }from '../create/CreateLoginApplication';
@Component({})
export default class extends Vue {
  isNotLogin() {
    return !CreateLoginApplication().IsLogin();
  }

  onLogin() {
    return CreateLoginApplication().Login();
  }
}
</script>
<style scoped>
h1 {
  display: inline-block;
}
</style>
