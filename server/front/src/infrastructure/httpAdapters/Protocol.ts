import { Sex }from '../../domain/user/Sex';
import { StudySubjectId }from '../../domain/studySubject/StudySubjectId';
import { CourseId }from '../../domain/course/CourseId';

export interface CreateUserParams {
  name: string;
  sex: Sex;
  schoolYear: number;
  classNumber: string;
  studySubjectId: StudySubjectId;
  courseId: CourseId;  
}
