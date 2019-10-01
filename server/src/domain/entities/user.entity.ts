import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Sex } from '../user/user.sex';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ length: 5 })
  oicNumber: string;

  @Column()
  birthday: Date;

  @Column({ length: 200 })
  note: string;

  @Column({ unique: true })
  googleProfileId: string;
}
