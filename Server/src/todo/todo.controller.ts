import { Controller, Put, Post, Delete, Get, Body, Param } from '@nestjs/common';

import { TodoService, Todo } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){};

    @Get('/todos')
    findAll():Todo[]{
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(id: string):Todo{
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body() createTodoDto: CreateTodoDto):Todo{
        return this.todoService.create(createTodoDto);
    }
    
    @Put(':id')
    update(@Param('id') id: string ,@Body()updateTodoDto: UpdateTodoDto):Todo{
        return this.todoService.update(id,updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string):void{
        this.todoService.remove(id);
    }

}
