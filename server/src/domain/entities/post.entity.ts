import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => User, user => user.posts)
    postUser: User;

    @Column()
    text: string;

    @CreateDateColumn()
    readonly createdAt: Date;

}
