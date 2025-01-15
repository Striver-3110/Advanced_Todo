import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto, UpdateTodoDto } from "./todo.dto";
import { Todo } from "./schemas/todo.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TodoService {
    // private todos : Todo[] = [];
    constructor(@InjectModel(Todo.name) private readonly todoModel : Model<Todo>){}

    async findAll():Promise<Todo[]>{
        return await this.todoModel.find().exec();
    }

    async findOne(id:string):Promise<Todo>{
        const todo:Todo = await this.todoModel.findById(id).exec();
        if(!todo){
            throw new NotFoundException(`Todo ${id} not found`);
        }
        return todo;
    }

    async create(createTodoDto: CreateTodoDto):Promise<Todo>{
        const todo = new this.todoModel(createTodoDto);
        return await todo.save()

    }

    async update(id: string ,updateTodoDto: UpdateTodoDto): Promise<Todo>{
        const todo: Todo = await this.todoModel.findById(id)
        if(!todo){
            throw new NotFoundException(`Todo with id: ${id} not found`)
        }
        todo.title = updateTodoDto.title;
        if(updateTodoDto.description)
            todo.description = updateTodoDto.description;
        return await todo.save()
    }


    async remove(id: string):Promise<void>{
        const todo = await this.todoModel.findById(id)
        if(!todo){
            throw new NotFoundException(`Todo with id: ${id} not found`)
        }
        await todo.deleteOne();
        console.log(`Todo with id: ${id} deleted`)
    }
}