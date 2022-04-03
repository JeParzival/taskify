import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { User, UserSchema } from '@schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '@schemas/Team.shema';
import { Invite, InviteSchema } from '@schemas/Invite.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
        MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    ],
    controllers: [UserController],
    providers: [],
})
export class UserModule { }
