<template>
  <!-- 投稿Post レイアウト-->
  <v-card>
    <v-card-title>
      <span class="headline">{{ myUserName }}</span>
      <v-col class="pb-0">
        <v-row justify="end">
          <v-list-item-avatar
            size="60"
            color="grey"
          />
        </v-row>
      </v-col>
    </v-card-title>
    <v-form v-model="valid">
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-textarea
              v-model="postText"
              outlined
              auto-grow
              label="投稿を書きましょう！"
              rows="8"
              row-height="30"
              shaped
              required
              :rules="postRule"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          outlined
          color="red"
          text
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          outlined
          color="blue"
          text
          :disabled="!valid"
          @click="onClickPost"
        >
          投稿
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch }from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop({ type: String, required: true }) myUserName!: string;
  @Prop({ type: String, required: true }) value!: string;

  postText: string = this.value;

  @Watch('postText')
  onChangePostText(newValue: string) {
    this.$emit('input', newValue);
  }

  postRule = [
    (v: string) => !!v || '投稿内容を入力してください。',
    (value: string) => {
      const pattern = /\S\s*?/;
      return pattern.test(value) || '空白、改行だけの投稿はできません。';
    },
  ];
  valid = true;

  onClickCancel() {
    this.$emit('cancel');
  }
  onClickPost() {
    this.$emit('post');
  }
}
</script>
