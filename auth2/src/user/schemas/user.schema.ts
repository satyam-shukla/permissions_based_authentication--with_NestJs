import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type UserDocument = User & Document;
import { UserPermissions } from 'src/auth/enums/role.enum'

@Schema()

export class User {
    @Prop()
    username:string;

    @Prop()
    email:string;

    @Prop()
    password:string;


    @Prop()
    permissions:UserPermissions[]


}


export const UserSchema = SchemaFactory.createForClass(User);