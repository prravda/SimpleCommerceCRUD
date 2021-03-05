import {Body, Controller, Post } from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserSignUp, UserSignIn} from "./interfaces/user.interface";

@Controller('users')
export class UsersController {
  constructor(
      private usersService: UsersService,
  ) {}

  @Post('signup')
  async createUser(@Body() userSignUp: UserSignUp) {
    const result = await this.usersService.createUser(userSignUp);
    return result;
  }

  @Post('signin')
  async findByMail(@Body() userSignIn: UserSignIn) {
    const result = await this.usersService.findByMail(userSignIn.mail);
    return result;
  }
}
