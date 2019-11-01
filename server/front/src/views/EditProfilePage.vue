<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="600"
    height="100%"
  >
    <v-card-title class="mx-auto">
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
    <v-row>
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
              prepend-icon="event"
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
          filled
          name="input-7-4"
          label="自由記述欄"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        />
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="items"
            label="Github,Twitterまたは、Qita URL"
            multiple
            chips
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row
        md="2"
        sm="6"
      >
        <v-text-field
          label="Solo"
          placeholder="My Website URL"
          solo
        />
      </v-row>
    </v-container>
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