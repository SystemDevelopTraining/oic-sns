<template>
  <v-app>
    <v-content>
      <drawer />
      <v-container>
        <router-view />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Footer from './components/Footer.vue';
import { CreateLoginApplication }from './create/CreateLoginApplication';
import Drawer from './components/Drawer.vue';

@Component({
  components: { Footer, Drawer },
})
export default class extends Vue {
  created() {
    const jwt = this.$route.query['jwt'];
    const loginApplication = CreateLoginApplication();
    if (typeof jwt === 'string') {
      const query = Object.assign({}, this.$route.query);
      loginApplication.SaveJwt(jwt);
      delete query['jwt'];
      this.$router.push({ query: query });
      if (window.opener) {
        window.opener.postMessage(this.$route.name, window.location.origin);
        window.close();
      }
    }
    const isLogin = loginApplication.IsLogin();
    if (isLogin === false) {
      this.$router.push({ path: '/' });
      return;
    }
    loginApplication.CheckJwt().then(flag => {
      if (!flag) {
        loginApplication.ClearJwt();
        location.href = '/';
      }
    });
  }
}
</script>

