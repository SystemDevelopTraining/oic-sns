<template>
  <!-- 投稿Post レイアウト-->
  <v-card color="primary">
    <v-form v-model="valid">
      <v-card-text>
        <v-textarea
          color="secondary"
          outlined
          auto-grow
          label="コメントを書きましょう！"
          rows="8"
          row-height="30"
          shaped
          required
          counter="255"
          :rules="commentRules"
          :value="value"
          @input="(v)=>$emit('input',v)"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          outlined
          color="warning"
          text
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          outlined
          color="accent"
          text
          :disabled="!valid"
          @click="onClickComment"
        >
          コメント
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang='ts'>
import { Component, Vue, Prop }from 'vue-property-decorator';
import { commentRules }from '../../domain/validationRules/PostAndCommentFormRules';

@Component
export default class extends Vue {
  valid = true;
  @Prop({ required: true, type: String }) value!: string;
  onClickCancel() {
    this.$emit('cancel');
  }
  onClickComment() {
    this.$emit('comment');
  }

  get commentRules() {
    return commentRules;
  }
}
</script>
