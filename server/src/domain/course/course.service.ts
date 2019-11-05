import { Course } from "../entities/course.entity";
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseDto } from "../../../front/src/domain/course/CourseDto";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    //全ての専攻を取得する
    async getCourses(): Promise<CourseDto[]> {
        try {
            const courses = await this.courseRepository.find();
            return courses.map(x => ({ id: { id: x.id }, name: x.name }));
        }
        catch (e) {
            throw new BadRequestException("専攻一覧取得に失敗しました");
        }
    }
}
