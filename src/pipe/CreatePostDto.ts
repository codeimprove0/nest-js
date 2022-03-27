import {IsString,IsInt} from 'class-validator'

export class CreatePostDto{

    @IsString()
    name: string;

    @IsInt()
    id:Number;

    @IsInt()
    email: Number;
}