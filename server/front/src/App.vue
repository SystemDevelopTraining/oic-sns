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
  mounted() {
    const loginInfoApplication = CreateLoginInfoApplication();
    const isLogin = loginInfoApplication.IsLogin();
    if (isLogin === false)this.$router.push({ path: '/' });
  }
}
</script>
