import { CourseDto }from './CourseDto';
import { CourseId }from './CourseId';

export interface CourseRepository {
    GetCourseItems(id: CourseId): Promise<CourseDto>;
}