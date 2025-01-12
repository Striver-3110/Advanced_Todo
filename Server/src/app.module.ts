import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { TodosController } from './todos/todos.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
// import { User } from './auth/schemas/user.schema';



@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/Todo-App"),
    AuthModule,
  ],
  controllers: [AppController, AuthController, TodosController],
  providers: [AppService, AuthService,],
})
export class AppModule {} 