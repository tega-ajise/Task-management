import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

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

  @Column({ default: 'USER' })
  role?: string;
  // change to USER | ADMIN | OWNER to be strongly typed

  @OneToMany(() => Task, (task) => task.owner)
  tasks!: Task[];
}
