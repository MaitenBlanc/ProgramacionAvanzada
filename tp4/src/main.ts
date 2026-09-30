import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Activar `rawBody`
    rawBody: true,
  });

  // `ValidationPipe` global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Puerto sugerido 3003
  await app.listen(process.env.PORT || 3003);
}
bootstrap();
