import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { User, UserDocument } from '@schemas/User.schema';

import { DUser } from '@decorators/user.decorator';
import { AuthGuard } from '@guards/auth.guard';

@Controller("/user")
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    @Get()
    @UseGuards(AuthGuard)
    public async GetMyData(@DUser() user: UserDocument): Promise<UserDocument> {
        return user;
    }
}
