import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}
  @MessagePattern('books_find_all')
  getBooks() {
    return this.appService.getAllBooks();
  }
}
