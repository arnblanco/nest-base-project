import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Aplication prefix: localhost:3000/api
  app.setGlobalPrefix('api');
  
  //Secure input data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  //Documentation information config.
  const config = new DocumentBuilder()
  .setTitle('Nest Base Project')
  .setDescription('API documentation for the base project.')
  .setVersion('1.0')
  .addTag('NBP')
  .build();

  //Documentation lounch
  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'docs', app, document );

  //Lounch app.
  await app.listen(3000);
}

bootstrap();
