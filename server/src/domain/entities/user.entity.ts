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
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  email: string;

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
  course: Course;

  @ManyToOne(type => StudySubject, studySubject => studySubject.users)
  @JoinColumn({ name: 'studySubjectId' })
  studySubject: StudySubject;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ length: 255, default: '' })
  license: string = '';

  @Column({ length: 255, default: '' })
  githubUrl: string = '';

  @Column({ length: 255, default: '' })
  twitterUrl: string = '';

  @Column({ length: 255, default: '' })
  homePageUrl: string = '';

  @Column({ length: 200, default: '' })
  note: string = '';

  @Column({ unique: true })
  googleProfileId: string;

  @OneToMany(type => Post, post => post.postUser, { cascade: true })
  posts: Post[];

  @OneToMany(type => Following, following => following.followUser, {
    cascade: true,
  })
  followings: Following[];

  @OneToMany(type => Following, following => following.followeeUser, {
    cascade: true,
  })
  followers: Following[];

  @OneToMany(type => Comment, comment => comment.commentUser, { cascade: true })
  comments: Comment[];
}
