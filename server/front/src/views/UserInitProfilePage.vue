<template>
  <v-card
    class="mx-auto d-flex flex-column"
    height="100%"
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
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        label="本名"
        :rules="nameRules"
        counter="25"
      />
      <v-select
        v-model="sex"
        :rules="requiredRules"
        label="性別"
        :items="['男','女']"
      />
      <v-select
        v-model="subject"
        :rules="requiredRules"
        label="学科"
        :items="subjectItems"
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
        :items="['1年','2年','3年','4年']"
      />
      <v-text-field
        v-model="classNumber"
        label="クラス番号"
        :rules="classNumberRules"
        counter="6"
      />
    </v-form>
    <div class="mt-auto pa-3">
      <v-btn
        large
        width="100"
        :disabled="!valid"
        @click="onClickRegister"
      >
        登録
      </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';
import { Sex }from '../domain/user/Sex';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { CreateLoginApplication }from '../create/CreateLoginApplication';
import { AsyncOnce }from '../utils/AsyncOnce';
import {
  requiredRules,
  nameRules,
  classNumberRules
}from '../domain/validationRules/CommonRules';
import { CourseId }from '../domain/course/CourseId';
import { StudySubjectId }from '../domain/studySubject/StudySubjectId';
@Component({})
export default class extends Vue {
  private name: string = '';
  private sex: Sex = Sex.man;
  private subject: StudySubjectId = { id: 1 };
  private course: CourseId = { id: 1 };
  private schoolYear: string = '';
  private classNumber: string = '';
  private asyncOnce = new AsyncOnce();

  created() {
    const jwt = this.$route.query['jwt'];
    if (typeof jwt === 'string') CreateLoginApplication().SaveJwt(jwt);
  }
  get nameRules(){return nameRules;}
  get requiredRules(){return requiredRules;}
  get classNumberRules(){return classNumberRules;}

  valid = true;

  get subjectItems() {
    const items = [
      {
        text: '総合情報メディア学科',
        value: 1,
      },
      {
        text: 'goehehehfefe',
        value: 2,
      },
    ];
    return items;
  }
  get courseItems() {
    const items = [
      {
        text: 'A',
        value: 1,
      },
      {
        text: 'B',
        value: 2,
      },
    ];
    return items;
  }
  onClickRegister() {
    this.asyncOnce.Do(this.register);
  }
  toNumberSchoolYear(): number {
    const numberSchoolYear = this.schoolYear.substr(0, 1);
    return Number(numberSchoolYear);
  }

  async register() {
    try {
      await CreateUserApplication().MakeUser({
        name: this.name,
        sex: this.sex,
        schoolYear: this.toNumberSchoolYear(),
        classNumber: this.classNumber,
        courseId: this.course,
        studySubjectId: this.subject,
      });
      this.$router.push({ name: 'timeline' });
    }catch (e) {
      alert('ユーザ作成に失敗しました');
    }
  }
}
</script>
