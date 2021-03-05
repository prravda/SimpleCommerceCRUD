import {Body, Controller, Post } from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserSignUp, UserSignIn} from "./interfaces/user.interface";

@Controller('users')
export class UsersController {
  constructor(
      private usersService: UsersService,
  ) {}

}
