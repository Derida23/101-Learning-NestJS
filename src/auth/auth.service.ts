import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'utils/hash-password.util';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  
  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    const existingUser = await this.prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.prisma.users.create({
      data: { ...rest, email, password: hashedPassword },
    });

    return this.buildResponse(user);
  }

  private buildResponse(user: any) {
    return {
      message: "Successfully registered",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      statusCode: 200,
    };
  }
}
