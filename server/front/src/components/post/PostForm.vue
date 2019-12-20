<template>
  <!-- 投稿Post レイアウト-->
  <v-card color="primary">
    <v-form v-model="valid">
      <v-card-text>
        <v-textarea
          color="secondary"
          :value="value.text"
          outlined
          auto-grow
          label="投稿を書きましょう！"
          rows="8"
          row-height="30"
          shaped
          required
          :rules="postRules"
          counter="255"
          @input="(v)=>{value.text=v;$emit('input',value)}"
        />
        <v-select
          color="secondary"
          outlined
          :value="value.categoryId"
          :items="categoryItems"
          label="種別"
          return-object
          @input="(v)=>{value.categoryId=v.value;$emit('input',value)}"
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
          @click="onClickPost"
        >
          投稿
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang='ts'>
import { Component, Vue, Prop }from 'vue-property-decorator';
import { postRules }from '../../domain/validationRules/PostAndCommentFormRules';
import { CategoryDto }from '../../domain/category/CategoryDto';
import { CreateCategoryApplication }from '../../create/CreateCategoryApplication';
import { CreatePostParamsDto }from '../../domain/post/CreatePostParamsDto';

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true }) value!: CreatePostParamsDto;

  valid = true;

  categoryDtoList: CategoryDto[] = [];

  async created() {
    this.categoryDtoList = await CreateCategoryApplication().GetCategoryItems();
  }

  onClickCancel() {
    this.$emit('cancel');
  }
  onClickPost() {
    this.$emit('post');
  }
  get postRules() {
    return postRules;
  }

  get categoryItems() {
    return this.categoryDtoList.map(x => ({ text: x.name, value: x.id }));
  }
}
</script>
