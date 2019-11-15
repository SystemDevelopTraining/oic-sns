import { CourseId }from '../course/CourseId';
import { StudySubjectId }from '../studySubject/StudySubjectId';

//ユーザ情報更新に必要な情報
export interface UpdateUserDto {
    name?: string;
    birthday?: string;
    note?: string;
    schoolYear?: number;
    license?: string;
    githubUrl?: string;
    twitterUrl?: string;
    homePageUrl?: string;
    classNumber?: string;
    courseId?: CourseId;
    studySubjectId?: StudySubjectId;
}