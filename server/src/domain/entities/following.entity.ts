import {
  Entity,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Following {
  @Column({ primary: true })
  readonly followUserId: number;

  @Column({ primary: true })
  readonly followeeUserId: number;

  @ManyToOne(type => User, user => user.followings, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'followUserId' })
  followUser: Promise<User>;

  @ManyToOne(type => User, user => user.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'followeeUserId' })
  followeeUser: Promise<User>;
}
