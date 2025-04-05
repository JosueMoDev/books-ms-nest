import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationDto } from 'src/common/dtos/pagination-dto';

@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @MessagePattern('createAuthor')
  create(@Payload() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @MessagePattern('findAllAuthor')
  findAll(dto: PaginationDto) {
    return this.authorService.findAll(dto);
  }

  @MessagePattern('findOneAuthor')
  findOne(@Payload() id: string) {
    return this.authorService.findOne(id);
  }

  @MessagePattern('updateAuthor')
  update(@Payload() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(updateAuthorDto);
  }

  @MessagePattern('removeAuthor')
  remove(@Payload() id: string) {
    return this.authorService.changeRecordStatus(id);
  }
}
