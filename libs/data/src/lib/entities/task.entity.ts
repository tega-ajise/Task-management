import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  todo!: string;

  @Column(
    'timestamp',
    /**for now till I reset the table */ { default: () => 'CURRENT_TIMESTAMP' }
  )
  dueDate!: Date;
}
