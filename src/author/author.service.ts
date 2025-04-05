import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { StatusError } from '@handler-errors';
import { PaginationDto } from 'src/common/dtos/pagination-dto';
import { Pagination } from 'src/common/entities/pagination';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateAuthorDto): Promise<Author> {
    try {
      const author = await this.prisma.author.create({
        data: dto,
      });
      return Author.fromObject(author);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async update({ id, ...rest }: UpdateAuthorDto): Promise<Author> {
    if (!Object.keys(rest).length)
      throw StatusError.badRequest('There is nothing to modify');
    try {
      await this.findOne(id);
      const author = await this.prisma.author.update({
        where: { id },
        data: { ...rest },
      });
      return Author.fromObject(author);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }

  async changeRecordStatus(id: string): Promise<object> {
    const { isActive, name, lastName } = await this.findOne(id);
    try {
      await this.prisma.author.update({
        where: { id },
        data: { isActive: !isActive },
      });
      return {
        message: `The Author ${name} ${lastName} ${
          isActive ? 'disabled' : 'enabled'
        } succesfully`,
      };
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }

  async findOne(id: string): Promise<Author> {
    try {
      const author = await this.prisma.author.findUnique({ where: { id } });
      if (!author) throw StatusError.badRequest('author not found');
      return Author.fromObject(author);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async findAll(
    dto: PaginationDto,
  ): Promise<{ pagination: Pagination; authors: Author[] }> {
    const { page, pageSize } = dto;
    const [authors, total] = await Promise.all([
      this.prisma.author.findMany({
        skip: Pagination.dinamycOffset(page, pageSize),
        take: pageSize,
      }),
      this.prisma.author.count(),
    ]);

    const pagination = Pagination.setPagination({ ...dto, total });
    const authorsMapped = authors.map(Author.fromObject);
    return { pagination, authors: authorsMapped };
  }
}
