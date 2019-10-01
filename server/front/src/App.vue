<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
    <div>
      <Header />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Header from '../components/headers/Header.vue';

@Component({
  components: { Header },
})
export default class extends Vue {}
</script>
