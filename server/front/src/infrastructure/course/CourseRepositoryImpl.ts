import { CourseRepository }from '../../domain/course/CourseRepository';
import { CourseDto }from '../../domain/course/CourseDto';
import { ApiClient }from '../httpAdapters/ApiClient';

export class CourseRepositoryImpl implements CourseRepository {
    public async GetCourseItems(): Promise<CourseDto[]> {
        const apiClient = new ApiClient();
        return await apiClient.GetCourseItems();
    }
}