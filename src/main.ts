import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['https://api-nest-i8iq.onrender.com/'];
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: whitelist,
    credentials: true,
  });
  await app.listen(env.PORT || 3000);
}
bootstrap();
