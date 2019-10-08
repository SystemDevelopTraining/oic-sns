<template>
  <div class="father">
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
      class="pa-0"
    >
      <v-row align="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
                
            color="white"
            size="50"
            class="ms-20"
          >
            フォロー
          </v-btn>
          <v-btn
            size="50"
            color="colors.red.darken1"
            class="ms-20"
          >
            フォローリスト
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </v-col>
  </v-row>
  </v-container>
  </div>
</template>