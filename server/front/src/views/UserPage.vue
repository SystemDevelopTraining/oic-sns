<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <div
      class="mt-6"
      align="center"
    >
      <el-row
        type="flex"
        class="row-bg"
        justify="center"
      >
        <el-col>
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
        </el-col>
      </el-row>
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
          <v-btn max-width="120">
            フォローリスト
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>