import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post as PostItem } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { PostInfos } from "../../../front/src/domain/post/PostInfos";

@Injectable()
export class TimelineService {
    constructor(
        @InjectRepository(PostItem)
        private readonly postRepository: Repository<PostItem>,
    ) { }

    async latest(): Promise<PostInfos[]> {
        const posts:(PostItem&User)[] = 
            await this.postRepository
                .query(`
                    select post.createdAt, post.text, user.name, user.id 
                        from post 
                        inner join user on post.postUserId=user.id 
                        order by createdAt desc limit 10
                    `);
        return posts.map<PostInfos>(x=>({
            userId:{id:x.id},
            postDate:x.createdAt,
            postText:x.text,
            userName:x.name
        }))
    }
}
