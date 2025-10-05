import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  displayName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
