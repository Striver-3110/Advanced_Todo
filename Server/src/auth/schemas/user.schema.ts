import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
    @Prop({required: true})
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password:string;

    @Prop({default: false})
    isVerified: boolean;

    @Prop()
    otp:string;
    
    @Prop({default: Date.now})
    otpExpiry:Date;

}

export const UserSchema = SchemaFactory.createForClass(User);