import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') 
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    async signup(@Body('username') username: string, @Body('password') password: string){
        return this.authService.signup(username, password);
    }
}
