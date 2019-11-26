import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../domain/entities/course.entity';
import { CourseController } from '../../application/course/course.controller';
import { CourseService } from '../../domain/course/course.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule { }
