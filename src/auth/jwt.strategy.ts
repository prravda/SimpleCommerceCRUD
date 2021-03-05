import { ExtractJwt, Strategy } from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AuthConfig} from "../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: String(AuthConfig.Secret),
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, mail: payload.mail };
    }
}