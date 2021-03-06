import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthConfig } from "../config";
import {JwtStrategy} from "./jwt.strategy";
import { AuthController } from './auth.controller';

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: String(AuthConfig.Secret),
        signOptions: { expiresIn: '120s' },
      }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
