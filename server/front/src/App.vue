<template>
  <v-app>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <div>
      <Footer />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Footer from './components/Footer.vue';
import { CreateLoginInfoApplication }from './create/CreateLoginInfoApplication';

@Component({
  components: { Footer },
})
export default class extends Vue {
  created() {
    const jwt = this.$route.query['jwt'];
    const loginApplication = CreateLoginInfoApplication();
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
    if (isLogin === false)this.$router.push({ path: '/' });
    if (!loginApplication.CheckJwt()) {
      loginApplication.ClearJwt();
      this.$router.push({ path: '/' });
    }
  }
}
</script>
