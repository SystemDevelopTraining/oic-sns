import { User } from '../../entities/user.entity';

export interface FindUserResponce {
    isMyself: boolean;
    user: User;
}
