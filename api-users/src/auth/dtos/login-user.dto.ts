import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsString()
  @IsStrongPassword()
  password: string;
}
