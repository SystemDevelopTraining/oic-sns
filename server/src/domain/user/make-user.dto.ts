import { Sex } from './user.sex';
import { IsNotEmpty, IsIn } from 'class-validator';
import { MakeUserDto as IMakeUserDto } from '../../../front/src/domain/user/MakeUserDto';
import { StudySubjectId } from '../../../front/src/domain/studySubject/StudySubjectId';
import { CourseId } from '../../../front/src/domain/course/CourseId';

export class MakeUserDto implements IMakeUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(['男', '女'])
  sex: Sex;

  schoolYear: number;
  classNumber: string;
  studySubjectId: StudySubjectId;
  courseId: CourseId;
}
