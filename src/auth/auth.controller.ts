import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Post('register')
  async create(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }

  @Post('Login')
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data.email, data.password);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return await this.authService.profile(Number(req.user.id));
  }
}
