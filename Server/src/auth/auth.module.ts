import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User ,UserSchema } from "./schemas/user.schema";
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService} from './auth.service';
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
// import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[
        // PassportModule,
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions:{expiresIn: "1d"}
        }),
    ],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy, JwtAuthGuard],
    exports: [
        MongooseModule,
    ],
})
export class AuthModule{}