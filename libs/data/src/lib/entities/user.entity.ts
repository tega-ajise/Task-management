import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';
import { AppRoles, Organizations } from '../enums/app.enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  displayName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: AppRoles, default: AppRoles.USER })
  role?: string;
  // change to USER | ADMIN | OWNER to be strongly typed

  @OneToMany(() => Task, (task) => task.owner)
  tasks!: Task[];

  @Column({ type: 'enum', enum: Organizations })
  organization!: Organizations;
}
