import { Controller, Get } from '@nestjs/common';
import { StudySubjectService } from '../../domain/study-subject/study-subject.service';
import { StudySubjectDto } from '../../../front/src/domain/studySubject/StudySubjectDto';

@Controller('study-subject')
export class StudySubjectController {
    constructor(private readonly studySubjectService: StudySubjectService) { }

    @Get('v1')
    index(): Promise<StudySubjectDto[]> {
        return this.studySubjectService.getStudySubjects();
    }
}
