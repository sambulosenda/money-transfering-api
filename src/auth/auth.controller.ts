import { Body, Controller, Inject, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { RegisterUserDto } from './dtos/RegisterUser.dtos';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}
  @Post('register')
  async registerUser(@Body() registerUserPayload: RegisterUserDto) {
    return instanceToPlain(this.authService.registerUser(registerUserPayload));
  }
}
