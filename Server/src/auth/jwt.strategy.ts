import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt } from "passport-jwt";
import {Strategy} from "passport-local";
import {Model} from "mongoose"
import { UserDocument,User } from "./schemas/user.schema";
import { JwtPayload } from "./jwt-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(User.name) private userModel : Model<UserDocument>,

    ){
        super({
            JwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            SecretOrKey: configService.get('JWT_SECRET'),
        })
        
    }
    async validate(payload: JwtPayload){
        const user = this.userModel.find({username:payload.username});
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
}