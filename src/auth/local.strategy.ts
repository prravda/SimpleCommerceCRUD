import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {UserSignIn} from "../users/interfaces/user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(userInfo: UserSignIn): Promise<any> {
        const user = await this.authService.validateUser(userInfo);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}