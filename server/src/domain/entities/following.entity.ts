import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(type => User, user => user.followings)
  @JoinColumn({ name: 'followUserId' })
  followUser: Promise<User>;

  @ManyToOne(type => User, user => user.followers)
  @JoinColumn({ name: 'followeeUserId' })
  followeeUser: Promise<User>;
}
