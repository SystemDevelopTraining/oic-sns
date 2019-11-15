import { StudySubjectDto }from '../../domain/studySubject/StudySubjectDto';
import { StudySubjectRepository }from '../../domain/studySubject/StudySubjectRepository';
import { ApiClient }from '../httpAdapters/ApiClient';

export class StudySubjectRepositoryImpl implements StudySubjectRepository {
    public async GetStudySubjectItems(): Promise<StudySubjectDto[]> {
        const apiClient = new ApiClient();
        return await apiClient.GetStudySubjectItems();
}
}