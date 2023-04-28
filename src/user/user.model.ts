import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document

@Schema({ timestamps: true, collection: 'Users' })
export class User {

    @Prop()
    name?: string;

    @Prop()
    email?: string;

    @Prop()
    type?: string

    @Prop()
    password?: string;

    createdAt?: Date
    updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true })