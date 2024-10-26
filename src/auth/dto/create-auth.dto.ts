import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateAuthDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' }) password: string;
  @IsOptional()
  name: string;
}
