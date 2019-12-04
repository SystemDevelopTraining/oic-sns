import { UserId }from '../user/UserId';

export interface CommentInfosDto {
    text: string;
    commentDate: Date;
    userId: UserId;
    userName: string;
}