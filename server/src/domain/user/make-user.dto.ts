import { Sex } from './user.sex';
import { IsNotEmpty, IsIn, Matches, Length } from 'class-validator';
import { MakeUserDto as IMakeUserDto } from '../../../front/src/domain/user/MakeUserDto';
import { StudySubjectId } from '../../../front/src/domain/studySubject/StudySubjectId';
import { CourseId } from '../../../front/src/domain/course/CourseId';

export class MakeUserDto implements IMakeUserDto {
  @IsNotEmpty()
  @Length(1, 25)
  @Matches(/^\S/)
  name: string;

  @IsNotEmpty()
  @IsIn(['男', '女'])
  sex: Sex;

  @IsNotEmpty()
  @IsIn([1, 2, 3, 4])
  schoolYear: number;

  @IsNotEmpty()
  @Length(6, 6)
  @Matches(/^[1-4][A-Z][0-9]{2}[A-Z]{2}/)
  classNumber: string;

  @IsNotEmpty()
  studySubjectId: StudySubjectId;

  @IsNotEmpty()
  courseId: CourseId;
}
