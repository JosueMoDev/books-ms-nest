import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dtos/pagination-dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('createBook')
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern('findAllBooks')
  findAll(dto: PaginationDto) {
    return this.booksService.findAll(dto);
  }

  @MessagePattern('find_one_book')
  findOne(@Payload() id: any) {
    return this.booksService.findOne(id.id);
  }

  @MessagePattern('updateBook')
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto);
  }

  @MessagePattern('removeBook')
  remove(@Payload() id: string) {
    return this.booksService.changeRecordStatus(id);
  }
}
