import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    readonly userId: number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: 'userId' })
    postUser: User;

    @Column()
    text: string;

    @CreateDateColumn()
    readonly createdAt: Date;

}
