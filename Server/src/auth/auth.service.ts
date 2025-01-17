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

    // signs up user, if exists returns appropriate message else allows signup
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
        
        const payload ={
            username: username,
            password: password,
        }
        const jwtToken = this.jwtService.sign(payload,{
            secret: process.env.JWT_SECRET
        });
        if(!jwtToken){
            return {
                success: false,
                message:"Unable to generate token"
            }
        }
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
            user:user,
            jwtToken: jwtToken
        }
    } 

    async login(username:string, password:string): Promise<any> {

        if(!username || !password){
            return{
                success: false,
                message: "All the fields are required!"
            }
        }

        const user = await this.userModel.findOne({username})
        if(!user){
            return{
                success: false,
                message: "User not found!"
            }
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return{
                success: false,
                message:"Invalid password!"
            }
        }

        const payload ={
            username: username,
            password: password,
        }
        const jwtToken = this.jwtService.sign(payload,{
            secret:process.env.JWT_SECRET
        })

        return {
            success: true,
            message: "User logged in successfully!",
            jwtToken: jwtToken
        }
    }
}