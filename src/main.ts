import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService);
  app.enableCors(CORS);
  app.use(morgan('dev'));
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(envConfig.get('PORT'));
  console.log(`\n Server running on port ${envConfig.get('PORT')}`);
  console.log(` App running on ${await app.getUrl()}`);
}
bootstrap();
