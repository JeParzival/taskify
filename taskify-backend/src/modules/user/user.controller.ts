import { TaskDocument } from './../../schemas/Task.schema';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { User, UserDocument } from '@schemas/User.schema';

import { DUser } from '@decorators/user.decorator';
import { AuthGuard } from '@guards/auth.guard';
import { ValidateObjectIdPipe } from '@pipes/validate-object-id.pipe';
import { CreateTaskDto } from '@dto/CreateTask.dto';
import { UserSettingsDto } from '@dto/UserSettings.dto';
import { Team, TeamDocument } from '@schemas/Team.shema';
import { Invite, InviteDocument } from '@schemas/Invite.schema';

@Controller("/user")
export class UserController {
    @InjectModel(User.name) private userModel: Model<UserDocument>;
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>;
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>;

    // 💕
    @Get()
    @UseGuards(AuthGuard)
    public async GetMyData(@DUser() user: UserDocument): Promise<UserDocument> {
        return user;
    }

    // 💕
    @Patch()
    @UseGuards(AuthGuard)
    public async UpdateUserSettings(@DUser() user: UserDocument, @Body() settings: UserSettingsDto): Promise<UserDocument> {
        let userModel = await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: { settings: settings } }, { new: true });

        return userModel;
    }

    // 💕
    @Delete("/tasks/:task")
    @UseGuards(AuthGuard)
    public async DeleteUserTask(@DUser() user: UserDocument, @Param('task', ValidateObjectIdPipe) taskId: string): Promise<Boolean> {
        let updateResult = await this.userModel.updateOne({ _id: user._id }, { $pull: { tasks: { _id: taskId } } });

        console.log(updateResult);
        if (updateResult.modifiedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    // 💕
    @Get("/tasks")
    @UseGuards(AuthGuard)
    public GetUserTasks(@DUser() user: UserDocument): TaskDocument[] {
        return user.tasks;
    }

    // 💕
    @Post("/tasks")
    @UseGuards(AuthGuard)
    public async AddUserTask(@DUser() user: UserDocument, @Body() createTask: CreateTaskDto): Promise<boolean> {
        let updateResult = await this.userModel.updateOne({ _id: user._id }, { $push: { tasks: createTask } }, { new: true });

        if (updateResult.modifiedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    @Patch("/tasks/:task")
    @UseGuards(AuthGuard)
    public async ComplateUserTask(@DUser() user: UserDocument, @Param('task', ValidateObjectIdPipe) taskId: string): Promise<boolean> {
        let updateResult = await this.userModel.updateOne({ _id: user._id, "tasks._id": taskId }, { $set: { "tasks.$.complated": true } }, { new: true });

        if (updateResult.modifiedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    // try with team
    @Get("/invites")
    @UseGuards(AuthGuard)
    public async GetUserInvites(@DUser() user: UserDocument): Promise<InviteDocument[]> {
        let invites = await this.inviteModel.find({ user: user._id });

        return invites || [];
    }

    @Post("/invites/:id")
    @UseGuards(AuthGuard)
    public async AcceptTeamInvite(@DUser() user: UserDocument, @Param('id', ValidateObjectIdPipe) id: string) {
        let invite = await this.inviteModel.findOneAndDelete({ _id: id });

        let updateResult = await this.teamModel.updateOne({ _id: invite.team }, {
            $push: {
                members: {
                    user: user._id,
                }
            }
        });

        if (updateResult.modifiedCount > 0) {
            return "Invite accepted";
        } else {
            return "Invite not accepted";
        }
    }

    @Delete("/invites/:id")
    @UseGuards(AuthGuard)
    public async DeclineTeamInvite(@DUser() user: UserDocument, @Param('id', ValidateObjectIdPipe) id: string) {
        let deletedResult = await this.inviteModel.deleteOne({ _id: id });

        if (deletedResult.deletedCount > 0) {
            return "Invite declined";
        } else {
            return "Invite not declined";
        }
    }
}
