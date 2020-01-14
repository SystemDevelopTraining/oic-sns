<template>
  <v-card>
    <v-toolbar>
      <v-btn
        class="mr-auto"
        color="latestPostBtnColor"
        dark
        @click="$emit('back')"
      >
        <v-icon dark>
          fa-backspace
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>投稿詳細</v-toolbar-title>
    </v-toolbar>
    <div>
      <post
        :post-infos="postInfos"
        @delete="()=>$emit('delete',postInfos.id)"
        @showCommentForm="$emit('showCommentForm',postInfos.id)"
      />
      <comment
        v-for="(commentInfos,idx) in commentInfosDtoList"
        :key="idx"
        :comment-infos="commentInfos"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import Post from './Post.vue';
import Comment from '../comment/Comment.vue';
import { Component, Vue, Prop }from 'vue-property-decorator';
import { PostInfos }from '../../domain/post/PostInfos';
import { CommentInfosDto }from '../../domain/comment/CommentInfosDto';

@Component({ components: { Post, Comment } })
export default class extends Vue {
  @Prop({ type: Object, required: true }) postInfos!: PostInfos;
  @Prop({ type: Array, required: true })
  commentInfosDtoList!: CommentInfosDto[];
}
</script>