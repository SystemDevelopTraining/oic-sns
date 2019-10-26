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
    const loginApplication = CreateLoginInfoApplication();
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') {
      loginApplication.SaveJwt(jwt);
      const query = Object.assign({}, this.$route.query);
      delete query['jwt'];
      this.$router.push({ query: query });
    }

    const isLogin = loginApplication.IsLogin();
    if (isLogin === false)this.$router.push({ path: '/' });
  }
}
</script>
