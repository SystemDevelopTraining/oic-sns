import { CourseRepository }from '../../domain/course/CourseRepository';
import { CourseDto }from '../../domain/course/CourseDto';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { ApiClient }from '../httpAdapters/ApiClient';

export class CourseRepositoryImpl implements CourseRepository {
    public async GetCourseItems(): Promise<CourseDto[]> {
        const jwt = CreateLoginApplication().GetJwt();
        const apiClient = new ApiClient(jwt);
        return await apiClient.GetCourseItems();
    }
}