import {Body, Controller, Post, Req, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {UserSignIn, UserSignUp} from "../users/interfaces/user.interface";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(@Request() req) {
        const result = await this.authService.signin(req.user);
        return result;
    }

    @Post('signup')
    async signup(@Body() userSignIn: UserSignIn) {
        const result = await this.authService.signup(userSignIn);
        return result;
    }
}
