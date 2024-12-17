import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@addons/response/Http-exception.filter';

const port = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('ApuestaTotal api service documentation')
        .setDescription('The ApuestaTotal API service description')
        .setVersion('1.0')
        .addTag('AccessLog')
        .addTag('User')
        .addTag('Auth')
        .addTag('UserRole')
        .addTag('UserPokemonRegister')
        .addTag('UserPokemonRegisterDetail')
        .addTag('MedalSequence')
        .addTag('AppSection')
        .setContact(
            'ApuestaTotal',
            'https://www.apuestatotal.com',
            'segundocardom@gmail.com'
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            filter: true
        }
    });
    await app.listen(port);
}
bootstrap();
