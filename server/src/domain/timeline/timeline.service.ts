import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post as PostItem } from "../entities/post.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class TimelineService {
    constructor(
        @InjectRepository(PostItem)
        private readonly postRepository: Repository<PostItem>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async latest(): Promise<PostItem[]> {
        const posts = this.postRepository.query('select * from post order by createdAt desc limit 10');
        return posts;
    }
}
