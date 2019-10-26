import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    readonly postUserId: number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: 'postUserId' })
    postUser: User;

    @Column()
    text: string;

    @CreateDateColumn()
    readonly createdAt: Date;

}
