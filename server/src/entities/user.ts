import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column()
    public name: string = ''

    @Column()
    public age: number = 0
}
