import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { DatabaseModule } from '../database/database.module'
import {AbstractUsersRepository} from "./user.abstract.repository";
import {UsersRepository} from "./users.repository";

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        // ...usersProviders,
    ],
    exports: [UsersService],
})

export class UsersModule {}