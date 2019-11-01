import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sex } from '../user/user.sex';
import { Following } from './following.entity';
import { Post } from './post.entity';
import { Course } from './course.entity';
import { StudySubject } from './study-subject.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ length: 5 })
  oicNumber: string;

  @Column({ length: 6 })
  classNumber: string;

  @Column()
  schoolYear: number;

  @Column()
  courseId: number;

  @Column()
  studySubjectId: number;

  @ManyToOne(type => Course, course => course.users)
  @JoinColumn({ name: 'courseId' })
  course: number;

  @ManyToOne(type => StudySubject, studySubject => studySubject.users)
  @JoinColumn({ name: 'studySubjectId' })
  studySubject: number;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ default: '' })
  license: string = '';

  @Column({ default: '' })
  githubUrl: string = '';

  @Column({ default: '' })
  twitterUrl: string = '';

  @Column({ default: '' })
  homePageUrl: string = '';

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
