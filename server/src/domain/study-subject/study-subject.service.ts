import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudySubject } from "../entities/study-subject.entity";
import { StudySubjectDto } from "../../../front/src/domain/studySubject/StudySubjectDto";

@Injectable()
export class StudySubjectService {
    constructor(
        @InjectRepository(StudySubject)
        private readonly studySubjectRepository: Repository<StudySubject>,
    ) { }

    //全ての学科を取得する
    async getStudySubjects(): Promise<StudySubjectDto[]> {
        try {
            const studySubjects = await this.studySubjectRepository.find();
            return studySubjects.map(x => ({ id: { id: x.id }, name: x.name }));
        }
        catch (e) {
            throw new BadRequestException("学科一覧取得に失敗しました");
        }
    }
}
