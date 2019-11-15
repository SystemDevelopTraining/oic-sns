import { StudySubjectApplication }from '../application/StudySubjectApplication';
import { StudySubjectRepositoryImpl }from '../infrastructure/studySubject/StudySubjectRepositoryImpl';

export function CreateStudySubjectApplication() {
    return new StudySubjectApplication(new StudySubjectRepositoryImpl());
}