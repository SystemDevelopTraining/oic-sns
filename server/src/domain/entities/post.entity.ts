import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  readonly postUserId: number;

  @ManyToOne(type => User, user => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postUserId' })
  postUser: User;

  @Column()
  text: string;

  @Column()
  readonly createdAt: Date = new Date();

  @Column()
  categoryId: number;

  @ManyToOne(type => Category, category => category.posts)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(type => Comment, comment => comment.parentPost, { cascade: true })
  comments: Comment;
}
