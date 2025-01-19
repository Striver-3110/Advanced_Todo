import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { OtpDto } from './dto/otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return await this.authService.sendOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otpDto: OtpDto): Promise<boolean> {
    return this.authService.verifyOtp(otpDto);
  }

  @Post('change-password')
  async changePassword(
    @Body('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    return this.authService.changePassword(id, changePasswordDto);
  }
}
