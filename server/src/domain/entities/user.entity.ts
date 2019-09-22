import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { sex } from '../user/user.sex';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: sex })
  sex: sex;

  @Column({ length: 5 })
  studentsNumber: string;

  @Column()
  birthday: Date;

  @Column({ length: 100 })
  note: string;

  @Column()
  gogleProfileId: string;
}
