import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {UserSignIn} from "../users/interfaces/user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'mail' });
    }

    async validate(mail: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(mail, password);
        if (!user) {
            throw new UnauthorizedException("Invalid Access");
        }
        return user;
    }
}