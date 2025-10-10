import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  todo!: string;

  //https://github.com/typestack/class-validator/issues/407
  @IsISO8601() // accepts YYYY-MM-DD format whereas @IsDate() does not
  @IsNotEmpty()
  dueDate!: Date | undefined;

  createdAt?: Date;

  isCompleted?: boolean = false;
}
