import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '@schemas/Team.shema';
import { TeamController } from './team.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])],
    controllers: [TeamController],
    providers: [],
})
export class UserModule { }
