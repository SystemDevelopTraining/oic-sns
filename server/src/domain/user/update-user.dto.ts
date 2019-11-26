import { UpdateUserDto as IUpdateUserDto } from "../../../front/src/domain/user/UpdateUserDto";
import { CourseId } from "../../../front/src/domain/course/CourseId";
import { StudySubjectId } from "../../../front/src/domain/studySubject/StudySubjectId";
import { MinDate, MaxDate, IsOptional, Length, Matches, IsIn } from "class-validator";

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 16);

const minDate = new Date();
minDate.setFullYear(maxDate.getFullYear() - 100);

export class UpdateUserDto implements IUpdateUserDto {
    @IsOptional()
    @Length(1, 25)
    @Matches(/^\S/)
    name?: string;

    birthday?: string;

    @IsOptional()
    @MaxDate(maxDate)
    @MinDate(minDate)
    get birthdayDate(): Date | string {
        return this.birthday && new Date(this.birthday)
    }

    @IsOptional()
    @Length(0, 200)
    note?: string;

    @IsOptional()
    @IsIn([1, 2, 3, 4])
    schoolYear?: number;

    @IsOptional()
    @Length(0, 255)
    license?: string;

    @IsOptional()
    @Length(0, 255)
    @Matches(/^https:\/\/github\.com\/./)
    githubUrl?: string;

    @IsOptional()
    @Length(0, 255)
    @Matches(/^https:\/\/twitter\.com\/./)
    twitterUrl?: string;

    @IsOptional()
    @Length(0, 255)
    @Matches(/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i)
    homePageUrl?: string;

    @IsOptional()
    @Length(6, 6)
    @Matches(/^[1-4][A-Z][0-9]{2}[A-Z]{2}/)
    classNumber?: string;

    courseId?: CourseId;
    studySubjectId?: StudySubjectId;
}