import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Post('register')
  async create(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }

}
