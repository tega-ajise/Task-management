export class CreateTaskDto {
  _id?: string;
  owner?: string | number;
  todo!: string;
  dueDate!: Date;
  createdAt?: Date;
  isCompleted?: boolean = false;
}
