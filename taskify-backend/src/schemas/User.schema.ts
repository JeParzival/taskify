import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Task, TaskDocument, TaskSchema } from "./Task.schema";

export type UserDocument = User & Document;

@Schema({ _id: false })
export class Settings {
    @Prop({ type: String })
    fullName: string;

    @Prop({ type: String })
    featuredTeam: string;

    @Prop({ type: String })
    title: string;
}

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Settings, required: true, default: new Settings() })
    settings: Settings;

    @Prop({ type: [TaskSchema], default: [], ref: Task.name })
    tasks: TaskDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
