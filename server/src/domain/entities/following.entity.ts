import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Following {
  @ManyToOne(type => User, user => user.followings, { primary: true })
  followUser: User;

  @ManyToOne(type => User, user => user.followers, { primary: true })
  followeeUser: User;
}
