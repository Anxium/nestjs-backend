import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { Logger } from '@nestjs/common';

dotenvConfig();

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const port = process.env.API_PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port} 🚀`);
}
bootstrap();
