import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User ,UserSchema } from "./schemas/user.schema";
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService} from './auth.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions:{expiresIn: "1d"}
        }),
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports: [
        MongooseModule,
    ],
    
})
export class AuthModule{}