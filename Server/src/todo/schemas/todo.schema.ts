import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Todo extends Document{
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description?: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);