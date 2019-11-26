import { UserRepository }from '../../domain/user/UserRepository';
import { MakeUserResult }from '../../domain/user/MakeUserResult';
import { MakeUserDto }from '../../domain/user/MakeUserDto';
import { UserId }from '~/src/domain/user/UserId';
import { ApiClient }from '../httpAdapters/ApiClient';
import { CreateLoginApplication }from '../../create/CreateLoginApplication';
import { UserDto }from '../../domain/user/UserDto';
import { UnauthorizedErrorHook }from '../UnauthorizedErrorHook';
import { MyGoogleProfileDto }from '../../domain/user/MyGoogleProfileDto';
import { UpdateUserDto }from '../../domain/user/UpdateUserDto';

// UserRepositoryの実装
export class UserRepositoryimpl implements UserRepository {
  public GetMyUserGoogleProfile(): Promise<MyGoogleProfileDto> {
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return apiClient.GetMyGoogleProfile();
  }
  public GetUser(userId: UserId): Promise<UserDto> {
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return apiClient.GetUser(userId).catch(UnauthorizedErrorHook);
  }
  public GetMyUserId(): Promise<UserId> {
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return apiClient.GetMyUserId().catch(UnauthorizedErrorHook);
  }
  public async MakeUser(makeUserDto: MakeUserDto): Promise<MakeUserResult> {
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient
      .CreateUser({
        name: makeUserDto.name,
        sex: makeUserDto.sex,
        schoolYear: makeUserDto.schoolYear,
        classNumber: makeUserDto.classNumber,
        studySubjectId: makeUserDto.studySubjectId,
        courseId: makeUserDto.courseId,
      })
      .catch(UnauthorizedErrorHook);
  }
  public async UpdateMyUser(updateUserDto:UpdateUserDto):Promise<unknown>{
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient
      .UpdateMyUser(updateUserDto)
      .catch(UnauthorizedErrorHook);
  }
  public async DeleteAccount(): Promise<unknown>{
    const jwt = CreateLoginApplication().GetJwt();
    const apiClient = new ApiClient(jwt);
    return await apiClient.DeleteAccount();
  }
}
