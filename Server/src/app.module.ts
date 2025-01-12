import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { TodosController } from './todos/todos.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, TodosController],
  providers: [AppService],
})
export class AppModule {}