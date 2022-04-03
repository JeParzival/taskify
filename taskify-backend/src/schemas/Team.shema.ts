import { UserDocument } from './User.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { Task, TaskSchema } from './Task.schema';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class TeamMember {
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    user: UserDocument;

    @Prop({ type: [TaskSchema], default: [], ref: 'Task' })
    tasks: []
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

@Schema({ timestamps: true })
export class Team {
    @Prop({ type: SchemaTypes.String, required: true })
    name: string;

    @Prop({ type: SchemaTypes.String, required: true, default: [] })
    description: string;

    @Prop({ type: [TeamMemberSchema], required: true })
    members: TeamMember[];

    @Prop({ type: [TaskSchema], default: [], required: true, ref: 'Task' })
    tasks: Task[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
