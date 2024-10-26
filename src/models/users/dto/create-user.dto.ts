import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'user is requied' })
  name: string;
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valit' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  @IsOptional()
  image: string;
  @IsOptional()
  role: string;
  @IsOptional()
  accountType: string;
  @IsOptional()
  isActive: boolean;
  @IsOptional()
  codeId: string;
  @IsOptional()
  codeExpired: Date;
}
