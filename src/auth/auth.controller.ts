import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { RegisterUserDto } from './dtos/RegisterUser.dtos';
import { LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}
  @Post('register')
  async register(@Body() registerUserPayload: RegisterUserDto) {
    return instanceToPlain(this.authService.registerUser(registerUserPayload));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    return 'OK'
  }
  
}
