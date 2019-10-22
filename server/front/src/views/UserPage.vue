<template>
  <v-card
    v-if="user"
    class="mx-auto"
    outlined
  >
    <div
      class="mt-6"
      align="center"
    >
      <v-row
        type="flex"
        class="row-bg"
        justify="center"
      >
        <v-col>
          <div class="grid-content">
            <v-avatar
              color="indigo"
              size="88"
            >
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-container
      fluid
      class="center"
    >
      <v-row>名前：{{ name }}</v-row>
      <v-row>性別：{{ sex }}</v-row>
      <v-row>学生番号：{{ oicNumber }}</v-row>
      <v-row>Note：{{ note }}</v-row>
      <v-row>誕生日：{{ birthday }}</v-row>
      <v-row>
        <v-col align="right">
          <v-btn
            v-if="isOtherUser"
            max-width="120"
          >
            フォロー
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            max-width="120"
            @click="onClickFollowList"
          >
            フォローリスト
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { UserDto }from '../domain/user/UserDto';

@Component({})
export default class extends Vue {
  user: UserDto | null = null;

  async created() {
    this.user = await CreateUserApplication().GetUser({
      id: Number(this.$route.params.id),
    });
  }

  get isOtherUser() {
    return this.user === null ? false : this.user.isMyself === false;
  }

  get name() {
    return this.user === null ? '' : this.user.name;
  }

  get sex() {
    return this.user === null ? '' : this.user.sex;
  }

  get birthday() {
    return this.user === null ? '' : this.user.birthday;
  }

  get note() {
    return this.user === null ? '' : this.user.note;
  }

  get oicNumber() {
    return this.user === null ? '' : this.user.oicNumber;
  }

  onClickFollowList() {
    this.$router.push({ name: 'followList' });
  }
}
</script>
 