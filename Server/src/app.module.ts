import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import {ConfigModule} from "@nestjs/config" 

// import { User } from './auth/schemas/user.schema';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/Todo-App"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService,],
})
export class AppModule {}