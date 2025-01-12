import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import {Types,Document} from "mongoose"

@Schema()
export class User{
    @Prop({required: true, unique: true})
    userId : string;

    @Prop({required: true})
    password : string;

    @Prop({ type:[{type: Types.ObjectId, ref: "Todo"}] })
    todos: Types.ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);