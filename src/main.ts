import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://api-nest-i8iq.onrender.com/',
    credentials: true,
    optionsSuccessStatus: 200,
  });
  await app.listen(env.PORT || 3000);
}
bootstrap();
