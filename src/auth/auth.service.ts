import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePasswords, hashPassword } from 'utils/hash-password.util';
import { User } from './interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }
  
  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    // Checking existing email
    const existingUser = await this.prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Encrypted password
    const hashedPassword = await hashPassword(password);
    const user = await this.prisma.users.create({
      data: { ...rest, email, password: hashedPassword },
    });

    return this.buildResponse(user, "Successfully registered");
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });

    // Checking user existing 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Checking password is valid
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.name, sub: user.id };


    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });


    return this.buildResponse(user, "Successfully logged in", access_token);
  }

  private buildResponse(user: User, message: string, access_token = null): { message: string; data: Partial<User>; statusCode: number } {
    return {
      message: message,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        access_token,
      },
      statusCode: 200,
    };
  }
}
