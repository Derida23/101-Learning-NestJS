import { Body, Controller, Post, Get, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly cloudinaryService: CloudinaryService
  ) { }
  
  @Post('register')
  async create(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data.email, data.password);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return await this.authService.profile(Number(req.user.id));
  }


  @UseGuards(AuthGuard)
  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(file);

    return this.authService.uploadImage(Number(req.user.id), result.url)
  }
}
