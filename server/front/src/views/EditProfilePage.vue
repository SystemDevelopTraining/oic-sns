<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="600"
    height="100%"
  >
    <v-card-title
      class="mx-auto"
      outlined
    >
      プロフィール編集ページ
    </v-card-title>
    <v-card outlined>
      <v-img
        class="mx-auto"
        width="100px"
        height="100px"
        src="/user_photo.png"
      />
    </v-card>
    <v-container fluid>
      <v-form>
        <v-text-field label="本名" />
        <v-select
          label="性別"
          :items="['男','女']"
        />
      </v-form>
    </v-container>
    <v-row class="px-3">
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="生年月日"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <div class="flex-grow-1" />
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-select
            v-model="subject"
            :rules="requiredRules"
            label="学科"
            :items="[
              '総合情報メディア学科','情報システム開発学科',
              '情報処理学科','ITテクニカル学科',
              'ITビジネス学科','総合情報メディア学科',
              'メディアクリエイト学科','メディアデザイン学科',
              'メディアクリエイト学科','メディアデザイン学科'
            ]"
            required
          />
          <v-select
            v-model="course"
            :rules="requiredRules"
            label="専攻"
            :items="['ITスペシャリスト専攻','システムエンジニア専攻']"
          />
          <v-select
            v-model="schoolYear"
            :rules="requiredRules"
            label="学年"
            :items="['1年','2年','3年','4年']"
          />
          <v-text-field
            v-model="classNumber"
            label="クラス番号"
            :rules="classNumberRules"
            counter="6"
          />
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="items"
            label="資格"
            multiple
            chips
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row md="6">
        <v-textarea
          class="mx-2"
          filled
          name="input-7-4"
          label="自由記述欄"
          value
        />
      </v-row>

      <v-row
        md="2"
        sm="6"
      >
        <v-text-field
          class="mx-2"
          filled
          name="input-7-4"
          label="Github URL"
          value
        />
      </v-row>

      <v-row
        md="2"
        sm="6"
      >
        <v-text-field
          class="mx-2"
          filled
          name="input-7-4"
          label="Twitter URL"
          value
        />
      </v-row>

      <v-row
        md="2"
        sm="6"
      >
        <v-text-field
          class="mx-2"
          filled
          name="input-7-4"
          label="Qitta URL"
          value
        />
      </v-row>

      <v-row
        -x3c-v-row
        md="2"
        sm="6"
      >
        <v-text-field
          class="mx-2"
          filled
          name="input-7-4"
          label="My Website URL"
          value
        />
      </v-row>
    </v-container>
    <div class="mt-auto pa-3">
      <v-btn
        class="float-right"
        dark
        width="100"
      >
        登録
      </v-btn>
    </div>
  </v-card>
</template>