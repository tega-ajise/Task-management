import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  todo!: string;

  @IsISO8601() // accepts YYYY-MM-DD format whereas @IsDate() does not
  @IsNotEmpty()
  dueDate!: Date | null;

  createdAt?: Date;

  isCompleted?: boolean = false;
}
