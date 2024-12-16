import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { envs } from 'src/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto, file: Express.Multer.File) {
    const { email, password } = registerUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      this.logger.warn(`El usuario con email ${email} ya existe.`);
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(password);
    const fileUrl = file ? `/uploads/${file.filename}` : null;

    const newUser = this.userRepository.create({
      username: registerUserDto.username,
      email: registerUserDto.email,
      password: hashedPassword,
      profileImageUrl: fileUrl,
      roles: ['user'],
      isActive: true,
      phone: registerUserDto.phone,
    });

    await this.userRepository.save(newUser);
    this.logger.log('Nuevo usuario guardado:', JSON.stringify(newUser));

    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Iniciando sesión para el usuario ${loginUserDto.email}`);

    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      this.logger.warn(`Usuario con email ${loginUserDto.email} no encontrado.`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn('Contraseña inválida');
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: user.username, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyToken(token: string) {
    this.logger.log('Verificando el token...');
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret, 
      });

      this.logger.log('Token verificado con éxito.');
      return {
        user,
        token: this.jwtService.sign(user),
      };
    } catch (error) {
      this.logger.error('La verificación del token falló', error.stack);
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async getUsers(page: number, limit: number) {
    this.logger.log(`Obteniendo usuarios de la página ${page} y el límite de ${limit} registros`);
    const users = await this.userRepository.find({
      skip: page * limit,
      take: limit,
    });
    this.logger.log('Usuarios obtenidos:', JSON.stringify(users));
    return users;
  }


  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(password: string, hashedPassword: string) {
    this.logger.log('Comparando las contraseñas...');
    return await bcrypt.compare(password, hashedPassword);
  }
}
