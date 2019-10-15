import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostDto } from '../post.dto';
import { Post as PostItem } from '../../../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { PostResult } from '../responce/post.result';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostItem)
        private readonly postRepository: Repository<PostItem>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(postDto: PostDto, googleProfileId: string): Promise<PostResult> {
        const post = new PostItem();
        post.postUser = await this.userRepository.findOne({ googleProfileId });
        post.text = postDto.text;
        try {
            await this.postRepository.save(post);
            return { success: true };
        } catch (e) {
            throw new HttpException('投稿に失敗しました', HttpStatus.BAD_REQUEST);
        }
    }
}
