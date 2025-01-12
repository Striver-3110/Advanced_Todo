import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from "mongoose"

@Schema()
export class Todo{
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    completed: boolean;

    @Prop({required: true})
    date : Date;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo)