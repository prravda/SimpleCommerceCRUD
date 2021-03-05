import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { UserSignIn } from "./users/interfaces/user.interface";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService,
  ) {}

  @Get()
  async sayHi() {
    return 'hi';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async signin(@Request() req) {
    const result = await this.authService.signin(req.user);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
