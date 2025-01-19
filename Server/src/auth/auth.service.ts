import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { NotFoundException, BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpDto } from './dto/otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignupDto } from "./dto/signup.dto";


@Injectable()
export class AuthService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
private readonly jwtService: JwtService
){}

    async signup(signupDto: SignupDto):Promise<User>{
        const {email, username, password} = signupDto
        const existingUser = await this.userModel.findOne({email});
        if(existingUser){
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            username
        },{new:true});
        if(!newUser){
            throw new Error('Error while creating new user')
        }
        return await newUser.save();
    }

    async login(loginDto:LoginDto):Promise<{accessToken: string}>{
        const {email, password} = loginDto;

        const existingUser = await this.userModel.findOne({email})
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password);

        if(passwordMatched){
            const payload = {email: existingUser.email, sub: existingUser._id};

            const accessToken = this.jwtService.sign(payload)
            return {accessToken};
        }
        else{
            throw new UnauthorizedException('Invalid password')
        }
    }

    async sendOtp(email: string){
        const user = await this.userModel.findOne({email});

        if(!user){
            throw new NotFoundException('User not found');
        }

        const otp = Math.floor(1e6+ Math.random() * 9e6).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10*60*1000)
        await user.save();

        console.log(`OTP for ${email}: ${otp}`);
        return otp;
    }

    async verifyOtp(otpDto:OtpDto) {
        const {email, otp} = otpDto;
        const user = await this.userModel.findOne({email,otp});
        if(!user || user.otpExpiry <= new Date()){
            throw new BadRequestException('Invalid Otp!')
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        user.save();
        return true;
    }

    async changePassword(userId: string, changePasswordDto:ChangePasswordDto):Promise<void>{
        const {currentPassword, newPassword} = changePasswordDto;
        const user = await this.userModel.findOne({_id:userId})

        if(!user ){
            throw new NotFoundException('User not found')
        }

        const isPasswordValid = bcrypt.compare(currentPassword, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Current password is not valid")
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save();

    }
}