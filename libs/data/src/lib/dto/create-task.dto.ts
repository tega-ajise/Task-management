import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  todo!: string;

  @IsDate()
  @IsNotEmpty()
  dueDate!: Date;

  createdAt?: Date;

  isCompleted?: boolean = false;
}
