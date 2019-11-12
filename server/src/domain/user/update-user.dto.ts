import { UpdateUserDto as IUpdateUserDto } from "../../../front/src/domain/user/UpdateUserDto";
import { CourseId } from "../../../front/src/domain/course/CourseId";
import { StudySubjectId } from "../../../front/src/domain/studySubject/StudySubjectId";

export class UpdateUserDto implements IUpdateUserDto {
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