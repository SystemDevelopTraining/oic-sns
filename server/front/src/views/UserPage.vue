<template>
  <div class="father">
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
        class="ma-20"
      >
        <v-row align="center">
          <v-card-actions
            class="d-flex flex-row mx-12"
            outlined
          >
            <v-col>
              <v-btn
                max-width="120"
                color="white"
              >
                フォロー
              </v-btn>
            </v-col>
      
            <v-col>
              <v-btn
                max-width="120"
                color="colors.red.darken1"
              >
                フォローリスト
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>