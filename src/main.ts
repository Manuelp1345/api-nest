import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { env } from 'process';
import graphqlPlayground from 'graphql-playground-middleware-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://api-nest-i8iq.onrender.com/',
    credentials: true,
    optionsSuccessStatus: 200,
  });
  app.use(
    '/playground',
    graphqlPlayground({
      endpoint: '/graphql',
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.PORT || 3000);
}
bootstrap();
