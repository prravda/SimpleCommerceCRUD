import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { OrdersService} from "./orders/orders.service";
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";


@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      OrdersModule,
      AuthModule,
  ],
  providers: [
      AppService,
      OrdersService,
  ],
  controllers: [
      AppController,
      UsersController,
      AuthController,
  ],
})
export class AppModule {}
