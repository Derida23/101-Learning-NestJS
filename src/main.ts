import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Environment
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const globalPrefix = configService.get<string>('API_PREFIX');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);
}

bootstrap();
