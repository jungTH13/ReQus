import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('ReQus Api example')
    .setDescription('The ReQus API description')
    .setVersion('0.1')
    .build();

  const app = await NestFactory.create(AppModule);

  //글로벌 미들웨어
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
