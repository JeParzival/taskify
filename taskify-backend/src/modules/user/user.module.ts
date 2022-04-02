import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { User, UserSchema } from '@schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [],
})
export class UserModule { }
