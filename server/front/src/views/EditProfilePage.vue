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
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="本名"
          counter="25"
        />
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="birthday"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="birthday"
              label="生年月日"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="birthday"
            locale="ja-JP"
            :max="maxBirthday"
            :min="minBirthday"
            @change="$refs.menu.save(birthday)"
          />
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
              :rules="licenseRules"
              counter="100"
              label="資格"
              filled
            />
            <v-textarea
              v-model="note"
              filled
              :rules="noteRules"
              counter="200"
              label="自由記述欄"
            />
            <v-text-field
              v-model="gitHubUrl"
              :rules="gitHubUrlRules"
              filled
              counter="255"
              label="Github URL"
            />
            <v-text-field
              v-model="twitterUrl"
              :rules="twitterUrlRules"
              filled
              counter="255"
              label="Twitter URL"
            />
            <v-text-field
              v-model="homePageUrl"
              :rules="urlRules"
              filled
              counter="255"
              label="ホームページ URL"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="float-right">
        <v-btn
          width="100"
          @click="BackFrontPage"
        >
          キャンセル
        </v-btn>
        <v-btn
          width="100"
          :disabled="!valid"
          @click="send"
        >
          登録
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch }from 'vue-property-decorator';
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
  noteRules,
  licenseRules,
}from '../domain/validationRules/EditProfilePageRules';
import { CourseDto }from '../domain/course/CourseDto';
import { StudySubjectDto }from '../domain/studySubject/StudySubjectDto';
import { CreateStudySubjectApplication }from '../create/CreateStudySubjectApplication';
import { CreateCourseApplication }from '../create/CreateCourseApplication';
import { CreateUserApplication }from '../create/CreateUserApplication';
import { StudySubjectId }from '../domain/studySubject/StudySubjectId';
import { CourseId }from '../domain/course/CourseId';
import { AsyncOnce }from '../utils/AsyncOnce';

@Component({ components: { BackBtn } })
export default class extends Vue {
  courseDtoList: CourseDto[] = [];
  studySubjectDtoList: StudySubjectDto[] = [];
  name = '';
  subject: StudySubjectId = { id: 0 };
  course: CourseId = { id: 0 };
  schoolYear = '';
  classNumber = '';
  birthday = '';
  license = '';
  note = '';
  gitHubUrl = '';
  twitterUrl = '';
  menu = false;
  homePageUrl = '';
  asyncOnce = new AsyncOnce();
  valid = true;

  async created() {
    const [studySubjectDtoList, courseDtoList, user] = await Promise.all([
      CreateStudySubjectApplication().GetStudySubjectItems(),
      CreateCourseApplication().GetCourseItems(),
      CreateUserApplication().GetMyUser(),
    ]);
    const studySubject = studySubjectDtoList.find(
      x => x.name === user.studySubject,
    );
    const course = courseDtoList.find(x => x.name === user.course);

    this.name = user.name;
    this.birthday =
      (user.birthday && new Date(user.birthday).toISOString().substr(0, 10)) ||
      '';
    this.subject = (studySubject && studySubject.id) || this.subject;
    this.course = (course && course.id) || this.course;
    this.note = user.note;
    this.license = user.license;
    this.schoolYear = user.schoolYear + '年';
    this.classNumber = user.classNumber;
    this.studySubjectDtoList = studySubjectDtoList;
    this.courseDtoList = courseDtoList;
    this.homePageUrl = user.homePageUrl;
    this.gitHubUrl = user.githubUrl;
    this.twitterUrl = user.twitterUrl;
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
  get noteRules() {
    return noteRules;
  }
  get licenseRules() {
    return licenseRules;
  }
  send() {
    this.asyncOnce.Do(this.updateMyUser);
  }

  async updateMyUser() {
    try {
      await CreateUserApplication().UpdateMyUser({
        name: this.name,
        classNumber: this.classNumber,
        studySubjectId: this.subject,
        courseId: this.course,
        license: this.emptyToUndefined(this.license),
        schoolYear: Number(this.schoolYear[0]),
        note: this.emptyToUndefined(this.note),
        githubUrl: this.emptyToUndefined(this.gitHubUrl),
        twitterUrl: this.emptyToUndefined(this.twitterUrl),
        homePageUrl: this.emptyToUndefined(this.homePageUrl),
        birthday:
          this.birthday === '' ? undefined : new Date(this.birthday).toJSON(),
      });
    }catch (e) {
      alert('プロフィール編集に失敗しました');
      return;
    }
    this.$router.push({ name: 'user' });
  }

  BackFrontPage() {
    this.$router.back();
  }

  get maxBirthday() {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);
    return maxDate.toISOString().substr(0, 10);
  }
  get minBirthday() {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    return minDate.toISOString().substr(0, 10);
  }

  @Watch('menu')
  changeMenu(val: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val && setTimeout(() => ((this.$refs.picker as any).activePicker = 'YEAR'));
  }

  emptyToUndefined(s: string): string | undefined {
    return s === '' ? undefined : s;
  }
}
</script>
