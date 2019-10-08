<template>
  <v-container
    fluid
    class="center"
  >
    <v-row>
      <v-col>
        <div>
          <v-btn
            block
            color="white"
          >
            投稿
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <post />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import Post from '../../components/Post.vue';
@Component({ components: { Post } })
export default class extends Vue {}
</script>