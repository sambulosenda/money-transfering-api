import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/utils/typeorm';
import { CreateUserParams, FindUserOptions, FindUserParams } from 'src/utils/types/queries';
import { UserFoundException } from './exceptions/UserfoundExeption';
import { IUserService } from './user';
import { hashPassword } from 'src/utils/helpers';
import { getUserSelectors } from 'src/utils/constants';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUser(params: FindUserParams, options?: FindUserOptions): Promise<User> {
    const select = getUserSelectors(options?.selectPassword)
    return this.userRepository.findOne({where: params, select });
  }

  async createUser(params: CreateUserParams) {
    const existingUser = await this.findUser({ username: params.username });
    if (existingUser) throw new UserFoundException();
    params.password = await hashPassword(params.password)
    const newUser = this.userRepository.create(params);

    return this.userRepository.save(newUser);
  }
}
