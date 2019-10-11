<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
    <div>
      <Footer />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Footer from './components/Footer.vue';

@Component({
  components: { Footer },
})
export default class extends Vue {}
</script>
