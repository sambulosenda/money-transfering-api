import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compareHash } from 'src/utils/helpers';
import { IUserService } from '../user/user';
import { Services } from '../utils/constants';
import { User } from '../utils/typeorm';
import {
  CreateUserParams,
  UserCredentialsParams,
} from '../utils/types/queries';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async validateUser(params: UserCredentialsParams) {
    const user = await this.userService.findUser(
      { username: params.username },
      { selectPassword: true },
    );
    console.log(user);
    const isPasswordValid = await compareHash(params.password, user.password);
    if (!isPasswordValid)
      throw new HttpException('Invalid', HttpStatus.FORBIDDEN);

    return user;
  }
  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }
}
