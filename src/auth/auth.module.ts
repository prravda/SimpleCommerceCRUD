import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthConfig } from "../config";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: AuthConfig.Secret,
        signOptions: { expiresIn: AuthConfig.Expires },
      }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
