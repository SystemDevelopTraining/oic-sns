import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudySubjectService } from '../../domain/study-subject/study-subject.service';
import { StudySubjectController } from '../../application/study-subject/study-subject.controller';
import { StudySubject } from '../../domain/entities/study-subject.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StudySubject])],
    controllers: [StudySubjectController],
    providers: [StudySubjectService],
})
export class StudySubjectModule { }
