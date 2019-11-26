<template>
  <v-card
    class="mx-auto d-flex flex-column"
    height="100%"
  >
    <v-card-title class="mx-auto">
      初期プロフィール設定ページ
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
    <v-form v-model="valid">
      <v-text-field
        label="学籍番号"
        :value="oicNumber"
        readonly
      />
      <v-text-field
        label="メールアドレス"
        :value="email"
        readonly
      />
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
        :items="['男', '女']"
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
        :items="['1年', '2年', '3年', '4年']"
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
import { AsyncOnce }from '../utils/AsyncOnce';
import {
  requiredRules,
  nameRules,
  classNumberRules,
}from '../domain/validationRules/CommonRules';
import { CourseId }from '../domain/course/CourseId';
import { StudySubjectId }from '../domain/studySubject/StudySubjectId';
import { CourseDto }from '../domain/course/CourseDto';
import { CreateCourseApplication }from '../create/CreateCourseApplication';
import { StudySubjectDto }from '../domain/studySubject/StudySubjectDto';
import { CreateStudySubjectApplication }from '../create/CreateStudySubjectApplication';

@Component({})
export default class extends Vue {
  private name = '';
  private sex: Sex = Sex.man;
  private subject: StudySubjectId = { id: 1 };
  private course: CourseId = { id: 1 };
  private schoolYear = '';
  private classNumber = '';
  private asyncOnce = new AsyncOnce();
  courseDtoList: CourseDto[] = [];
  studySubjectDtoList: StudySubjectDto[] = [];
  oicNumber = '';
  email = '';
  valid = true;

  async created() {
    const [
      { email, oicNumber, name },
      courseDtoList,
      studySubjectDtoList,
    ] = await Promise.all([
      CreateUserApplication().GetMyUserGoogleProfile(),
      CreateCourseApplication().GetCourseItems(),
      CreateStudySubjectApplication().GetStudySubjectItems(),
    ]);
    this.courseDtoList = courseDtoList;
    this.studySubjectDtoList = studySubjectDtoList;
    this.email = email;
    this.oicNumber = oicNumber;
    this.name = name;
  }
  get nameRules() {
    return nameRules;
  }
  get requiredRules() {
    return requiredRules;
  }
  get classNumberRules() {
    return classNumberRules;
  }
  get subjectItems() {
    return this.studySubjectDtoList.map(x => ({ text: x.name, value: x.id }));
  }
  get courseItems() {
    return this.courseDtoList.map(x => ({ text: x.name, value: x.id }));
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
