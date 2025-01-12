import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
dotenv.config();


// eslint-disable-next-line
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{abortOnError:false});
  // console.log(process.env.JWT_SECRET)
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();