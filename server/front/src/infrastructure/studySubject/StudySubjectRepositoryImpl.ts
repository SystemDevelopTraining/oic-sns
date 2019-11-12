import { StudySubjectDto }from '../../domain/studySubject/StudySubjectDto';
import { StudySubjectRepository }from '../../domain/studySubject/StudySubjectRepository';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { ApiClient }from '../httpAdapters/ApiClient';

export class StudySubjectRepositoryImpl implements StudySubjectRepository {
    public async GetStudySubjectItems(): Promise<StudySubjectDto> {
        const jwt = CreateLoginApplication().GetJwt();
        const apiClient = new ApiClient(jwt);
        return await apiClient.GetStudySubjectItems();
}
}