<template>
  <v-card
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
      <v-row>
        <v-col align="right">
          <v-btn max-width="120">
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

@Component({})
export default class extends Vue {
  onClickFollowList() {
    this.$router.push({ name: 'followList' });
  }
}
</script>
 