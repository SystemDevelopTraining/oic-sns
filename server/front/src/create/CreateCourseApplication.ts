import { CourseApplication }from '../application/CourseApplication';

export function CreateCourseApplication() {
    return new CourseApplication(new CourseApplicationImpl());
}