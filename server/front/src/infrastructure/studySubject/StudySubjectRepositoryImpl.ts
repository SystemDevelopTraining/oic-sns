import { StudySubjectDto }from '../../domain/studySubject/StudySubjectDto';
import { StudySubjectRepository }from '../../domain/studySubject/StudySubjectRepository';
import { StudySubjectId }from '../../domain/studySubject/StudySubjectId';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { ApiClient }from '../httpAdapters/ApiClient';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';

export class StudySubjectApplicationImpl implements StudySubjectRepository {
    public async GetStudySubjectitems(id: StudySubjectId ): Promise<StudySubjectDto> {
        const jwt = CreateLoginApplication().GetJwt();
        const apiClient = new ApiClient(jwt);
        return await apiClient.GetStudySubject(id).catch(UnauthorizedErrorHook);
    }
}