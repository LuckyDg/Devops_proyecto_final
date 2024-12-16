import { Body, Controller, CustomDecorator, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Token, User } from './decorators';
import { AuthGuard } from './guards/auth.guard';
import { fileFilter, storage } from './helpers/fileFilter.helper';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al registrar usuario.' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    }),
  )
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const user = await this.authService.register(registerUserDto, file);  
      return {
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 400, description: 'Credenciales inválidas.' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  @ApiOperation({ summary: 'Verificar el token JWT' })
  @ApiResponse({ status: 200, description: 'Token verificado exitosamente.' })
  @ApiResponse({ status: 401, description: 'Token no válido.' })
  async verify(@User() user: CustomDecorator, @Token() token: string) {
    return {
      user,
      token,
      newToken: this.authService.verifyToken(token),
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Obtener usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos.' })
  @ApiResponse({ status: 400, description: 'Error al obtener usuarios.' })
  async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const users = await this.authService.getUsers(page, limit);
      return {
        users,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
