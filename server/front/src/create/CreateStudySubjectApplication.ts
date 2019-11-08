import { StudySubjectApplication }from '../application/StudySubjectApplication';
import { StudySubjectApplicationImpl }from '../infrastructure/studySubject/StudySubjectRepositoryImpl';

export function CreateStudySubjectApplication() {
    return new StudySubjectApplication(new StudySubjectApplicationImpl());
}