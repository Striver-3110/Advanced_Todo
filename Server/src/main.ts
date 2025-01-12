import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{abortOnError:false});
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();