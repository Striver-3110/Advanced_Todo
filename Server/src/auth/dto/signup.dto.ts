import { IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;

    @MinLength(8)
    password:string;
}