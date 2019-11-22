import { IsNotEmpty, Matches } from "class-validator";
import { CreatePostParamsDto } from "../../../front/src/domain/post/CreatePostParamsDto";
import { CategoryId } from "../../../front/src/domain/category/CategoryId";

//投稿を作成するのに必要なもの
export class PostDto implements CreatePostParamsDto {
    @IsNotEmpty()
    @Matches(/\S\s*?/)
    text: string;

    @IsNotEmpty()
    categoryId: CategoryId;
}