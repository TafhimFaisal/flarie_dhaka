import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppMiddleware implements NestMiddleware {
 
  constructor(){}
  async use(req: any, res: any, next: () => void) {
    try{
      next();
    }catch(error){
      throw new HttpException(error.response,error.status)
    }
  }
}
  