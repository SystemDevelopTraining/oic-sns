import { CreateCommentParamsDto } from '../../../front/src/domain/post/CreateCommentParamsDto';
import { IsNotEmpty, Matches } from 'class-validator';

export class CommentDto implements CreateCommentParamsDto {
  @IsNotEmpty()
  @Matches(/\S\s*?/)
  text: string;
}
