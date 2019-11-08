import { StudySubjectRepository }from '../domain/studySubject/StudySubjectRepository';
import { StudySubjectId }from '../domain/studySubject/StudySubjectId';
import { StudySubjectDto }from '../domain/studySubject/StudySubjectDto';

export class StudySubjectApplication {

    private readonly repository: StudySubjectRepository;
    public constructor(repository: StudySubjectRepository) {
        this.repository = repository;
    }
 // 学科一覧取得する
public async GetStudySubjectItems(id: StudySubjectId): Promise<StudySubjectDto> {
    return this.repository.GetStudySubjectItems(id);
}

}