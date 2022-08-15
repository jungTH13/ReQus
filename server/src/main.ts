import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('ReQus Api example')
    .setDescription('The ReQus API description')
    .setVersion('0.1')
    .build();

  const app = await NestFactory.create(AppModule);

  //글로벌 미들웨어
  app.use(cookieParser(process.env.JWT_SECRET));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //스웨거 설정
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
