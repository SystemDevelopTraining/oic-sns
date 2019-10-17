import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Sex } from '../user/user.sex';
import { Following } from './following.entity';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ length: 5 })
  oicNumber: string;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ length: 200, default: '' })
  note: string = '';

  @Column({ unique: true })
  googleProfileId: string;

  @OneToMany(type => Post, post => post.postUser)
  posts: Post[];

  @OneToMany(type => Following, following => following.followUser)
  followings: Following[];

  @OneToMany(type => Following, following => following.followeeUser)
  followers: Following[];
}
