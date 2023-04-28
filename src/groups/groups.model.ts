import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Groups & Document

@Schema({ timestamps: true, collection: 'Groups' })
export class Groups {

    @Prop()
    name?: string;

    @Prop()
    userIds?: string[]

    createdAt?: Date
    updatedAt?: Date
}

export const GroupSchema = SchemaFactory.createForClass(Groups);
GroupSchema.index({ name: 1 }, { unique: true })