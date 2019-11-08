import { Controller, Get } from '@nestjs/common';
import { CourseService } from '../../domain/course/course.service';
import { CourseDto } from '../../../front/src/domain/course/CourseDto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get('v1')
    index(): Promise<CourseDto[]> {
        return this.courseService.getCourses();
    }
}
