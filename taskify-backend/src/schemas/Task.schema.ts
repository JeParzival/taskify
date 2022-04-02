import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ type: SchemaTypes.String, required: true })
    content: string;

    @Prop({ type: SchemaTypes.Date })
    expiresAt: Date;

    @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
    completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
