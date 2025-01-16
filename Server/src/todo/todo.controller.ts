import { Controller, Put, Post, Delete, Get, Body, Param } from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from "./schemas/todo.schema";
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){};

    @Get('/getAllTodos')
    async findAll():Promise<Todo[]>{
        return this.todoService.findAll();
    }

    @Get('getTodo/:id')
    async findOne(@Param('id')id: string):Promise<Todo>{
        console.log(id)
        return this.todoService.findOne(id);
    }

    @Post('/addTodo')
    async create(@Body() createTodoDto: CreateTodoDto):Promise<Todo>{
        return this.todoService.create(createTodoDto);
    }
    
    @Put('updateTodo/:id')
    async update(@Param('id') id: string ,@Body()updateTodoDto: UpdateTodoDto):Promise<Todo>{
        return this.todoService.update(id,updateTodoDto);
    }

    @Delete('deleteTodo/:id')
    async remove(@Param('id') id: string):Promise<void>{
        this.todoService.remove(id);
    }
}
