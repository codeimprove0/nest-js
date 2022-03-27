 
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { HttpExceptionFilter } from './exception/http.filter'; 
import { AuthGuard } from './guards/auth.guard'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe) 

  //app.useGlobalFilters(new HttpExceptionFilter()) 

 // app.useGlobalGuards(new AuthGuard())
 
  await app.listen(3000);
}
bootstrap();
