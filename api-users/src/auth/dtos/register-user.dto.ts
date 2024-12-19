import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'Nombre de usuario' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Número de teléfono' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Número de teléfono del usuario', required: false })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}
