import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto, UpdateTodoDto } from "./todo.dto";


interface Todo {
    id: string;
    title: string;
    description?: string;
}


@Injectable()
export class TodoService {
    private todos : Todo[] = [];

    findAll():Todo[]{
        return this.todos;
    }

    findOne(id:string):Todo | undefined{
        const todo:Todo = this.todos.find(todoObj => todoObj.id === id);
        if(!todo){
            throw new NotFoundException(`Todo ${id} not found`);
        }
        return todo;
    }

    create(createTodoDto: CreateTodoDto):Todo{
        const newTodo: Todo = {
            id: (this.todos.length+1).toString(),
            ...createTodoDto
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    update(id: string ,updateTodoDto: UpdateTodoDto): Todo{
        const todo: Todo = this.todos.find(todo=> todo.id === id)
        if(!todo){
            throw new NotFoundException(`Todo with id: ${id} not found`)
        }
        Object.assign(todo, updateTodoDto)

        return todo;
    }

    remove(id: string):void{
        const todo = this.todos.find(todo => todo.id === id)
        if(!todo){
            throw new NotFoundException(`Todo with id: ${id} not found`)
        }
        console.log(`Todo with id: ${todo.id} deleted`)
    }

}