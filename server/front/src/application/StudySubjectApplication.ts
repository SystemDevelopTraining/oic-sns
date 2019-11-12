import { StudySubjectRepository }from '../domain/studySubject/StudySubjectRepository';
import { StudySubjectDto }from '../domain/studySubject/StudySubjectDto';

export class StudySubjectApplication {
private readonly repository: StudySubjectRepository;
    public constructor(repository: StudySubjectRepository) {
        this.repository = repository;
    }
 // 学科一覧取得する
public async GetStudySubjectItems(): Promise<StudySubjectDto> {
    return this.repository.GetStudySubjectItems();
    }
}