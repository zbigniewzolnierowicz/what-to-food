import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  display_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

