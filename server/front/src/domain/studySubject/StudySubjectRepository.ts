import { StudySubjectDto }from './StudySubjectDto';

export interface StudySubjectRepository {
    GetStudySubjectItems(): Promise<StudySubjectDto>;
}