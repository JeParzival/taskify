import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from '@schemas/Invite.schema';
import { Team, TeamSchema } from '@schemas/Team.shema';
import { User, UserSchema } from '@schemas/User.schema';
import { TeamController } from './team.controller';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Team.name, schema: TeamSchema },
        { name: Invite.name, schema: InviteSchema },
        { name: User.name, schema: UserSchema }
    ])],
    controllers: [TeamController],
    providers: [],
})
export class TeamModule { }
