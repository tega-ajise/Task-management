export class CreateTaskDto {
  _id?: string;
  owner?: number;
  todo!: string;
  dueDate!: Date;
  createdAt?: Date;
}
