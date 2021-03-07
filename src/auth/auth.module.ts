import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthConfig } from "../config";
import {JwtStrategy} from "./jwt.strategy";
import { AuthController } from './auth.controller';
import {UsersRepository} from "../users/users.repository";
import {CouponsModule} from "../coupons/coupons.module";
import {CouponsService} from "../coupons/coupons.service";

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: String(AuthConfig.Secret),
        signOptions: { expiresIn: '62m' },
      }),
      CouponsModule,
  ],
  providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
      UsersRepository,
      CouponsService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
