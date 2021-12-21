import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  console.log('server start! | ' + PORT);
}

bootstrap();
