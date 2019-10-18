<template>
  <div>
    <post
      v-for="(_,index) in new Array(5).fill(1)"
      :key="index"
      :post-infos="postInfos"
    />
  </div>
</template>


<script lang="ts">
import Post from '../components/Post.vue';
import PostInfos from '../domain/post/PostInfos.ts';
import { Component, Vue }from 'vue-property-decorator';
@Component({ components: { Post } })
export default class extends Vue {
  postInfos: PostInfos = {
    userId: {
      id: 23,
    },
    userName: 'James Bond',
    postText:
      'I am loving to program for this project. I am not so good at it YET! though, i feel like i can do this job. I love the PROGRAMMER name in my life. I am loving to program for this project. I am not so good at it YET! though, i feel like i can do this job. I love the PROGRAMMER name in my life. ',
    postDate: new Date(),
  };
}
</script>