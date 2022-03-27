import { Module,NestModule,MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UsersController } from './users/users.controller'; 
import { EmployeeModule } from './employee/employee.module';  
import { BlogsService } from './blogs/blogs.service';
import { PostsController } from './posts/posts.controller'; 

import {AuthMiddleware} from './middleware/auth'
import {AuthMiddleware2} from './middleware/auth2'
  
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core'
import { HttpExceptionFilter } from './exception/http.filter';
import { AuthGuard } from './guards/auth.guard';  
import { MulterModule } from '@nestjs/platform-express';
 
import {TypeOrmModule} from '@nestjs/typeorm'

import {User} from './entity/user.entity'
  
@Module({
  imports: [
    EmployeeModule,
    MulterModule.register({
      dest:'./uploads'
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'all-india',
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
     // entities:[User],
      synchronize:true
    })
    
],
  controllers: [AppController, UsersController, PostsController ],
  // providers: [AppService, BlogsService,{
  //   provide: APP_FILTER,
  //   useClass: HttpExceptionFilter
  // },{
  //   provide: APP_GUARD,
  //   useClass: AuthGuard
  // } ],
  providers: [AppService, BlogsService ],
})

//export class AppModule {}

export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware,AuthMiddleware2)
    .exclude({
      path:'posts/post-list',method:RequestMethod.GET
    })
    .forRoutes('posts')
 // .forRoutes(PostsController)
//  .forRoutes({
//    path:'posts/post-list',method:RequestMethod.GET
//  })
    
  }
}
 
