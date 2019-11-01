import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Course {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => User, user => user.courseId)
  users: User[];
}
