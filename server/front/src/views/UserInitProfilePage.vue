<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="600"
    min-height="550"
  >
    <v-card-title class="mx-auto">
      初期プロフィール設定ページ
    </v-card-title>
    <v-card outlined>
      <v-img
        class="mx-auto"
        width="100px"
        height="100px"
        src="user_photo.png"
      />
    </v-card>
    <v-form>
      <v-text-field label="本名" />
      <v-select
        label="性別"
        :items="['男','女']"
      />
    </v-form>
    <div class="mt-auto pa-3">
      <v-btn
        large
        width="100"
      >
        登録
      </v-btn>
    </div>
  </v-card>
</template>