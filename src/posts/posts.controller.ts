import { Controller,Get,Post,Param, ParseIntPipe, HttpStatus, Query, DefaultValuePipe, ParseArrayPipe, UsePipes, Body, ValidationPipe, HttpException, UseFilters, ForbiddenException, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';

import {AuthPipe} from '../pipe/AuthPipe'

import {CreatePostDto} from '../pipe/CreatePostDto'

import {HttpExceptionFilter} from '../exception/http.filter' 
import { AuthGuard } from 'src/guards/auth.guard'; 
import { LoggingInterceptor } from 'src/interceptors/logging.interceptors';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
 
@Controller('posts')

//@UseInterceptors(LoggingInterceptor)

export class PostsController {

    @Get('post-list') 
   // @UseGuards(AuthGuard) 
    postList():object{ 
        console.log("API Call")
        return  {
            data:"POST LIST DATA",
            id:12,
            item:[{name:"test"}]
        }
    }
 
    @Get('info/:id')
   // @UseFilters(new HttpExceptionFilter())
    postInfo(@Param('id', ParseIntPipe) id:number):object{

        if(id==12){
           // throw new HttpException('XYZ',HttpStatus.NOT_FOUND)

        //    throw new HttpException({
        //        status:HttpStatus.ACCEPTED,
        //        error:'CUSTOM error'
        //    },HttpStatus.ACCEPTED)

        throw new ForbiddenException();
        }
        return {
            id:id,
            data:'NA'
        }
    }
 

    // @Post('post-add') 
    // @UseInterceptors(FileInterceptor('profile'))
    // postAdd(@UploadedFile() profile:Express.Multer.File):object {  
    //     console.log(profile)
    //     return {
    //         message:"file uploaded"
    //     }
    // }

    // @Post('post-add') 
    // @UseInterceptors(FileFieldsInterceptor([
    //     {
    //         name:'profile',maxCount:2
    //     },{
    //         name:'profile2',maxCount:1
    //     }
    // ]))
    // postAdd(@UploadedFiles() profile: {profile?:Express.Multer.File[],profile2?:Express.Multer.File[] }):object {  
    //     console.log(profile)
    //     return {
    //         message:"file uploaded"
    //     }
    // }

    @Post('post-add') 
    @UseInterceptors(FilesInterceptor('profile'))
    postAdd(@UploadedFiles() profilexyz:Array<Express.Multer.File> ):object {  
        console.log(profilexyz)
        return {
            message:"file uploaded"
        }
    }





    @Get('detail')
    postDetail(){
        return "post detail"
    }

    @Post('lists/:id') 
    // @HttpCode(404)
    // ######## Normal case#####
    // detailById(@Param('id',ParseIntPipe) id: number):string {
    //     console.log(id,'===')
    //     return "List user"+id
    // } 

    // detailById(@Query('page',new DefaultValuePipe(10)) page : number):string {
    //     console.log(page,'===')
    //     return "List user"+page
    // } 

    // detailById(@Query('id',new ParseArrayPipe({items:Number,separator:','})) id : number[]):string {
    //     console.log(id,'===')
    //     return "List user"+id
    // } 

    // @UsePipes(new AuthPipe())
    // detailById(@Param('id') id : number):string { 
    //     return "List user"+id
    // } 
 
 //   @UsePipes(ValidationPipe)
    detailById(@Body() CreatePostDto : CreatePostDto) { 
        console.log(CreatePostDto)
        return "List user"
    } 
 
 



}
