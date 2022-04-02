import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ _id: false })
export class Settings {
    @Prop({ default: false })
    darkMode: boolean;

    @Prop({ default: false })
    showNotifications: boolean;
}

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Settings, required: true, default: new Settings() })
    settings: Settings;
}

export const UserSchema = SchemaFactory.createForClass(User);
