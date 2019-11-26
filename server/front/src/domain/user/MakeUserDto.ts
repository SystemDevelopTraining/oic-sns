import { Sex }from './Sex';
import { StudySubjectId }from '../studySubject/StudySubjectId';
import { CourseId }from '../course/CourseId';

//ユーザを作成する時に必要となるデータ
export interface MakeUserDto {
  name: string;
  sex: Sex;
  schoolYear: number;
  classNumber: string;
  studySubjectId: StudySubjectId;
  courseId: CourseId;
}
