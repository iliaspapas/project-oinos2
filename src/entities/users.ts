import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './roles';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, salt);
  }
}
