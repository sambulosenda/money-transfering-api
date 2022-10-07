import { Module } from '@nestjs/common';
import { User } from 'src/utils/typeorm';
import { Services } from '../utils/constants';
import {TypeOrmModule} from "@nestjs/typeorm"
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USERS,
      useClass:  UserService,
    },
  ],
})
export class UserModule {}
