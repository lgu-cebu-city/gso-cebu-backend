import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(json({ limit: '50mb' }));

  app.useGlobalFilters(new GlobalExceptionFilter)
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });

  const config = new DocumentBuilder()
    .setTitle('GSO API')
    .setDescription('GSO System')
    .setVersion('1.0')
    .addTag('GSO')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
