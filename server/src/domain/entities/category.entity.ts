import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Post, post => post.categoryId)
    posts: Post[];

}