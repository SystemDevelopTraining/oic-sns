import { CourseRepository }from '../domain/course/CourseRepository';
import { CourseDto }from '../domain/course/CourseDto';

export class CourseApplication{
private readonly repository: CourseRepository;
    public constructor(repository: CourseRepository) {
        this.repository = repository;
    }
    //  専攻一覧取得する
    public async GetCourseItems(): Promise<CourseDto[]> {
        return this.repository.GetCourseItems();   
    }
}