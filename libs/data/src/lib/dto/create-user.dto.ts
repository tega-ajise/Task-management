export class CreateUserDto {
  _id?: string;
  displayName!: string;
  email!: string;
  password!: string;
  role?: string;
}
