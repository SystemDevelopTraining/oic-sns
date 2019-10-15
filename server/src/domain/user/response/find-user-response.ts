import { User } from '../../entities/user.entity';

export interface FindUserResponse {
    isMyself: boolean;
    user: User;
}
