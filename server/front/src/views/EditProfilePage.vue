<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="600"
    height="100%"
  >
    <back-btn />
    <v-card-title
      class="mx-auto"
      outlined
    >
      プロフィール編集ページ
    </v-card-title>
    <v-row
      type="flex"
      class="row-bg"
      justify="center"
    >
      <v-avatar
        color="grey"
        size="80"
      >
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
    </v-row>
    <v-container fluid>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="本名"
        counter="25"
      />
      <v-select
        v-model="sex"
        :rules="requiredRules"
        label="性別"
        :items="['男', '女']"
      />
      <v-menu
        ref="menu"
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
      <v-row>
        <v-col>
          <v-select
            v-model="subject"
            :rules="requiredRules"
            label="学科"
            :items="studySubjectItems"
            required
          />
          <v-select
            v-model="course"
            :rules="requiredRules"
            label="専攻"
            :items="courseItems"
          />
          <v-select
            v-model="schoolYear"
            :rules="requiredRules"
            label="学年"
            :items="['1年', '2年', '3年', '4年']"
          />
          <v-text-field
            v-model="classNumber"
            label="クラス番号"
            :rules="classNumberRules"
            counter="6"
          />

          <v-text-field
            v-model="license"
            label="資格"
            filled
          />
          <v-textarea
            v-model="note"
            filled
            label="自由記述欄"
          />
          <v-text-field
            v-model="gitHubUrl"
            :rules="gitHubUrlRules"
            filled
            label="Github URL"
          />
          <v-text-field
            v-model="twitterUrl"
            :rules="twitterUrlRules"
            filled
            label="Twitter URL"
          />
          <v-text-field
            v-model="webSiteUrl"
            :rules="urlRules"
            filled
            label="My Website URL"
          />
        </v-col>
      </v-row>
      <v-card-actions class="float-right">
        <v-btn
          dark
          width="100"
          @click="BackFrontPage"
        >
          キャンセル
        </v-btn>
        <v-btn
          dark
          width="100"
        >
          登録
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { Sex }from '../domain/user/Sex';
import BackBtn from '../components/BackBtn.vue';
import {
  nameRules,
  classNumberRules,
  requiredRules,
}from '../domain/validationRules/CommonRules';
import {
  urlRules,
  twitterUrlRules,
  gitHubUrlRules,
}from '../domain/validationRules/EditProfilePageRules';
import { CourseDto }from '../domain/course/CourseDto';
import { StudySubjectDto }from '../domain/studySubject/StudySubjectDto';
import { CreateStudySubjectApplication }from '../create/CreateStudySubjectApplication';
import { CreateCourseApplication }from '../create/CreateCourseApplication';
@Component({ components: { BackBtn } })
export default class extends Vue {
  courseDtoList: CourseDto[] = [];
  studySubjectDtoList: StudySubjectDto[] = [];
  name: string = '';
  sex: Sex = Sex.man;
  subject: string = '';
  course: string = '';
  schoolYear: number = 0;
  classNumber: string = '';
  date: string = '';
  license: string = '';
  note: string = '';
  gitHubUrl: string = '';
  twitterUrl: string = '';
  webSiteUrl: string = '';

  async created() {
    const [studySubjectDtoList, courseDtoList] = await Promise.all([
      CreateStudySubjectApplication().GetStudySubjectItems(),
      CreateCourseApplication().GetCourseItems(),
    ]);
    this.studySubjectDtoList = studySubjectDtoList;
    this.courseDtoList = courseDtoList;
  }

  get courseItems() {
    return this.courseDtoList.map(x => ({ text: x.name, value: x.id }));
  }
  get studySubjectItems() {
    return this.studySubjectDtoList.map(x => ({ text: x.name, value: x.id }));
  }

  get urlRules() {
    return urlRules;
  }
  get nameRules() {
    return nameRules;
  }
  get classNumberRules() {
    return classNumberRules;
  }
  get twitterUrlRules() {
    return twitterUrlRules;
  }
  get gitHubUrlRules() {
    return gitHubUrlRules;
  }
  get requiredRules() {
    return requiredRules;
  }

  BackFrontPage(){
    this.$router.back();
  }
}
</script>
