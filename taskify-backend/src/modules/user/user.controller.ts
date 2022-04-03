import { TaskDocument } from './../../schemas/Task.schema';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { User, UserDocument } from '@schemas/User.schema';

import { DUser } from '@decorators/user.decorator';
import { AuthGuard } from '@guards/auth.guard';
import { ValidateObjectIdPipe } from '@pipes/validate-object-id.pipe';
import { CreateTaskDto } from '@dto/CreateTask.dto';
import { UserSettingsDto } from '@dto/UserSettings.dto';
import { Team, TeamDocument } from '@schemas/Team.shema';

@Controller("/user")
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Team.name) private teamModel: Model<TeamDocument>) { }

    @Get()
    @UseGuards(AuthGuard)
    public async GetMyData(@DUser() user: UserDocument): Promise<UserDocument> {
        return user;
    }

    @Delete("/tasks/:index")
    @UseGuards(AuthGuard)
    public async DeleteUserTask(@DUser() user: UserDocument, @Param('index', ParseIntPipe) index: number): Promise<UserDocument> {
        let userModel = await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: { tasks: { $slice: ['$tasks', index] } } }, { new: true });

        return userModel;
    }

    @Post("/tasks")
    @UseGuards(AuthGuard)
    public async AddUserTask(@DUser() user: UserDocument, @Body() createTask: CreateTaskDto): Promise<UserDocument> {
        let userModel = await this.userModel.findOneAndUpdate({ _id: user._id }, { $push: { tasks: createTask } }, { new: true });

        return userModel;
    }

    @Get("/tasks")
    @UseGuards(AuthGuard)
    public GetUserTasks(@DUser() user: UserDocument): TaskDocument[] {
        return user.tasks;
    }

    @Patch()
    @UseGuards(AuthGuard)
    public async UpdateUserSettings(@DUser() user: UserDocument, @Body() settings: UserSettingsDto): Promise<UserDocument> {
        let userModel = await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: { settings: settings } }, { new: true });

        return userModel;
    }

    @Get("/invites")
    @UseGuards(AuthGuard)
    public async GetUserInvites(@DUser() user: UserDocument): Promise<TeamDocument[]> {
        let teams = await this.teamModel.find({ user: user._id }).populate("team", "name description");

        return teams || [];
    }
}
