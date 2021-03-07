import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService,
  ) {}

  @Get()
  async getHello() {
    return 'hi';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}
