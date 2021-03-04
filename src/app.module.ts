import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
