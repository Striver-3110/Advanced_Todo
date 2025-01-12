import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose"
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
        private jwtService : JwtService
    ){}

    async signup(username: string, password: string): Promise<any>{
        if(!username || !password){
            return {
                success:false,
                message: "All the fields are required!"
            }
        }

        const existingUser = await this.userModel.findOne({username});
        if(existingUser){
            return{
                success:false,
                message: "User already exists!"
            }
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(hash)

        const user = new this.userModel({username: username, password: hash});
        const newUser = await user.save();

        if(!newUser){
            return{
                success: false,
                message: "Failed to create user!"
            }
        }

        return {
            success: true,
            message: "User created successfully",
            user:user
        }
    } 
}