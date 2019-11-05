import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  readonly postUserId: number;

  @ManyToOne(type => User, user => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'postUserId' })
  postUser: User;

  @Column()
  text: string;

  @Column()
  readonly createdAt: Date = new Date();
}
