import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  readonly commentUserId: number;

  @ManyToOne(type => User, user => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentUserId' })
  commentUser: User;

  @Column()
  readonly parentPostId: number;

  @ManyToOne(type => Post, post => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentPostId' })
  parentPost: Post;

  @Column()
  text: String;

  @Column()
  readonly createdAt: Date = new Date();
}
