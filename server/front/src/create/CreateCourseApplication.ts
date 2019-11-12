import { CourseApplication }from '../application/CourseApplication';
import { CourseRepositoryImpl }from '../infrastructure/course/CourseRepositoryImpl';

export function CreateCourseApplication() {
    return new CourseApplication(new CourseRepositoryImpl());
}