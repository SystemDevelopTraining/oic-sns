import { StudySubjectDto }from './StudySubjectDto';
import { StudySubjectId }from './StudySubjectId';


export interface StudySubjectRepository {
    GetStudySubjectItems(id: StudySubjectId): Promise<StudySubjectDto>;
}