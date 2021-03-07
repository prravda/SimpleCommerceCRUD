import {Body, Controller, Post, Req, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {CreateUserDTO} from "../users/users.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(@Request() req) {
        return this.authService.signin(req.user);
    }

    @Post('signup')
    async signup(@Body() createUserDTO: CreateUserDTO) {
        const result = await this.authService.signup(createUserDTO);
        return result;
    }
}
