import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class StudySubject {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => User, user => user.studySubjectId)
  users: User[];
}
