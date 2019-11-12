import { CourseDto }from './CourseDto';

export interface CourseRepository {
    GetCourseItems(): Promise<CourseDto>;
}