<template>
  <div>
    <post
      v-for="(_,index) in new Array(5).fill(1)"
      :key="index"
    />
  </div>
</template>


<script lang="ts">
import Post from '../components/Post.vue';
import { Component, Vue }from 'vue-property-decorator';
@Component({ components: { Post } })
export default class extends Vue {}
</script>