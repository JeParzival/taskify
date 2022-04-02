import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type InviteDocument = Invite & Document;

@Schema({ timestamps: true })
export class Invite {
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    team: string;

    @Prop({ type: SchemaTypes.ObjectId, required: true })
    user: string;

    @Prop({ type: SchemaTypes.String, required: true })
    description: string;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
