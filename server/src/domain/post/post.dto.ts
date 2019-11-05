import { IsNotEmpty, Matches } from "class-validator";

//投稿を作成するのに必要なもの
export class PostDto {
    @IsNotEmpty()
    @Matches(/\S\s*?/)
    text: string;
}