import { User, UserDocument } from '@schemas/User.schema';
import { Model } from 'mongoose';
import { Controller, Get, NotFoundException, Param, UseGuards, Post, Body, Delete, Patch, UnauthorizedException, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from '@schemas/Team.shema';
import { AuthGuard } from '@guards/auth.guard';
import { ValidateObjectIdPipe } from '@pipes/validate-object-id.pipe';
import { DUser } from '@decorators/user.decorator';
import { CreateTaskDto } from '@dto/CreateTask.dto';
import { Invite, InviteDocument } from '@schemas/Invite.schema';
import { CreateTeamDto } from '@dto/CreateTeam.dto';

@Controller('team')
export class TeamController {
    @InjectModel(Team.name)
    private teamModel: Model<TeamDocument>

    @InjectModel(Invite.name)
    private inviteModel: Model<InviteDocument>

    @InjectModel(User.name)
    private userModel: Model<UserDocument>

    @Post()
    @UseGuards(AuthGuard)
    public async CreateTeam(@DUser() user: UserDocument, @Body() createTeam: CreateTeamDto) {
        let flag = await this.teamModel.exists({ name: createTeam.name });
        if (flag) {
            throw new BadRequestException('Team name already exists');
        }

        let team = this.teamModel.create({
            name: createTeam.name,
            owner: user._id,
            description: createTeam.description,
        });

        return team;
    }

    @Get('/:team')
    @UseGuards(AuthGuard)
    public async GetTeam(@DUser() user: UserDocument, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOne({ _id: teamId, $or: [{ "members.user": user._id }, { "owner": user._id }] });
        if (!team) {
            throw new NotFoundException();
        }

        return team;
    }

    // yapılacak
    @Patch('/:teamid')
    @UseGuards(AuthGuard)
    public async UpdateTeam() { }

    @Get('/:team/members/:member')
    @UseGuards(AuthGuard)
    public async GetTeamMember(@DUser() user: UserDocument, @Param('member', ValidateObjectIdPipe) memberId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOne({ _id: teamId, "members.user": memberId, owner: user._id }, { "members.$": 1 });
        if (!team) {
            throw new NotFoundException();
        }

        return team.members[0];
    }

    @Post("/:team/members/:member/tasks")
    @UseGuards(AuthGuard)
    public async AddTaskOnTeamMember(@DUser() user: UserDocument, @Body() createTask: CreateTaskDto, @Param('member', ValidateObjectIdPipe) memberId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOneAndUpdate({ _id: teamId, "members.user": memberId, owner: user._id }, { $push: { "members.$.tasks": createTask } }, { new: true });
        if (!team) {
            throw new NotFoundException();
        }

        return team.members[0].tasks || [];
    }

    // task'in özel id'si oluşuyor mu kontrol et
    // eğer oluşuyorsa User controller'dan DeleteTask metodunu düzelt
    @Delete("/:team/members/:member/tasks/:task")
    @UseGuards(AuthGuard)
    public async DeleteTaskOnTeamMember(@DUser() user: UserDocument, @Param('task', ValidateObjectIdPipe) taskId: string, @Param('member', ValidateObjectIdPipe) memberId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOneAndUpdate({ _id: teamId, "members.user": memberId, owner: user._id }, { $pull: { "members.$.tasks": { _id: taskId } } }, { new: true });
        if (!team) {
            throw new NotFoundException();
        }

        return team.members[0].tasks || [];
    }

    @Get("/:team/tasks")
    @UseGuards(AuthGuard)
    public async GetTeamTasks(@DUser() user: UserDocument, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOne({ _id: teamId, "members.user": user._id }, { "tasks": 1 });
        if (!team) {
            throw new NotFoundException();
        }

        return team.tasks || [];
    }

    @Post("/:team/tasks")
    @UseGuards(AuthGuard)
    public async AddTaskOnTeam(@DUser() user: UserDocument, @Body() createTask: CreateTaskDto, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOneAndUpdate({ _id: teamId, owner: user._id }, { $push: { "tasks": createTask } }, { new: true, projection: { "tasks": 1 } });
        if (!team) {
            throw new NotFoundException();
        }

        return team.tasks || [];
    }

    @Delete("/:team/tasks/:task")
    @UseGuards(AuthGuard)
    public async RemoveTaskOnTeam(@DUser() user: UserDocument, @Param('task', ValidateObjectIdPipe) taskId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOneAndUpdate({ _id: teamId, owner: user._id }, { $pull: { "tasks": { _id: taskId } } }, { new: true, projection: { "tasks": 1 } });
        if (!team) {
            throw new NotFoundException();
        }

        return team.tasks || [];
    }

    @Delete("/:team/members/:member")
    @UseGuards(AuthGuard)
    public async DeleteTeamMember(@DUser() user: UserDocument, @Param('member', ValidateObjectIdPipe) memberId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let updateResult = await this.teamModel.updateOne({ _id: teamId, owner: user._id }, { $pull: { "members": { user: memberId } } });

        if (updateResult.modifiedCount > 0) {
            return "Success";
        } else {
            return "Fail";
        }
    }

    @Get("/:team/invites")
    @UseGuards(AuthGuard)
    public async GetTeamInvites(@DUser() user: UserDocument, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let flag = await this.teamModel.exists({ owner: user._id });
        if (!flag) {
            throw new UnauthorizedException();
        }

        let invites = await this.inviteModel.find({ team: teamId }, { "invites": 1 }).populate("user", "settings.fullName");
        if (!invites) {
            throw new NotFoundException();
        }

        return invites || [];
    }

    @Post("/:team/invites/:email")
    @UseGuards(AuthGuard)
    public async InviteUserTeam(@DUser() user: UserDocument, @Param('email') email: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let isOwner = await this.teamModel.exists({ _id: teamId, owner: user._id });
        if (!isOwner) {
            throw new UnauthorizedException('You are not the owner of this team');
        }

        let targetUser = await this.userModel.findOne({ email: email });
        if (!targetUser) {
            throw new NotFoundException('User not found');
        }

        let isTeamMember = await this.teamModel.exists({ _id: teamId, "members.user": targetUser._id });
        if (isTeamMember) {
            throw new NotAcceptableException('Already a member');
        }

        let isInvited = await this.inviteModel.exists({ team: teamId, user: targetUser._id });
        if (isInvited) {
            throw new NotAcceptableException('Already invited');
        }

        let invite = await this.inviteModel.create({ team: teamId, user: targetUser._id, description: "Invited by " + (user.settings.fullName || "owner") });

        return invite;
    }

    @Delete('/:team/invites/:id')
    @UseGuards(AuthGuard)
    public async DeleteInvite(@DUser() user: UserDocument, @Param('id', ValidateObjectIdPipe) id: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let isOwner = await this.teamModel.exists({ _id: teamId, owner: user._id });
        if (!isOwner) {
            throw new UnauthorizedException('You are not the owner of this team');
        }

        let deleteResult = await this.inviteModel.deleteOne({ _id: id });

        if (deleteResult.deletedCount > 0) {
            return "Success";
        } else {
            return "Fail";
        }
    }

    @Post("/:team/members/tasks/:task")
    @UseGuards(AuthGuard)
    public async ComplateTaskOnTeamMember(@DUser() user: UserDocument, @Param('task', ValidateObjectIdPipe) taskId: string, @Param('team', ValidateObjectIdPipe) teamId: string) {
        let team = await this.teamModel.findOneAndUpdate({ _id: teamId, "members.user": user._id, "members.user.tasks._id": taskId }, { $set: { "members.$.tasks": { completed: true } } }, { new: true, projection: { "members.$.tasks": 1 } });
        if (!team) {
            throw new NotFoundException();
        }

        return team.members[0].tasks || [];
    }
}
