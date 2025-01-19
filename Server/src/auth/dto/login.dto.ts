import { MinLength, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail()
    email:string;

    @MinLength(8)
    @IsNotEmpty()
    password:string;
}