import { IsString, IsNotEmpty, IsOptional} from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    // @IsBoolean()
    // completed: boolean;

    @IsString()
    @IsOptional()
    description: string;

    // @IsDate()
    // date: Date;
}

export class UpdateTodoDto{
    @IsString()
    @IsNotEmpty()
    title?: string;

    // @IsBoolean()
    // completed: boolean;

    @IsString()
    @IsOptional()
    description?: string;

}

