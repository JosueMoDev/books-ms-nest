import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { StatusError } from '@handler-errors';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination-dto';
import { Pagination } from 'src/common/entities/pagination';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  public includes = {
    author: {
      select: {
        id: true,
        name: true,
        lastName: true,
      },
    },
    genre: {
      select: { name: true, id: true },
    },
  };

  async create(dto: CreateBookDto): Promise<Book> {
    try {
      const book = await this.prisma.book.create({
        data: dto,
        include: this.includes,
      });
      return Book.fromObject(book);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async update({ id, ...rest }: UpdateBookDto): Promise<Book> {
    await this.findOne(id);
    if (!Object.keys(rest).length)
      throw StatusError.badRequest('There is nothing to modify');

    try {
      const book = await this.prisma.book.update({
        where: { id },
        data: { ...rest },
        include: this.includes,
      });
      return Book.fromObject(book);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async changeRecordStatus(id: string): Promise<object> {
    const { isActive, title } = await this.findOne(id);
    try {
      await this.prisma.book.update({
        where: { id },
        data: { isActive: !isActive },
      });
      return {
        message: `The Book ${title} ${
          isActive ? 'disabled' : 'enabled'
        } succesfully`,
      };
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const book = await this.prisma.book.findFirst({
        where: { id },
        include: this.includes,
      });
      if (!book) throw StatusError.badRequest('Book not found');

      return Book.fromObject(book);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async findAll(
    dto: PaginationDto,
  ): Promise<{ pagination: Pagination; books: Book[] }> {
    const where: Prisma.BookWhereInput = {};
    const { page, pageSize, search } = dto;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { name: { contains: search, mode: 'insensitive' } } },
        { genre: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        skip: Pagination.dinamycOffset(page, pageSize),
        take: pageSize,
        include: this.includes,
        where,
      }),

      this.prisma.book.count({ where }),
    ]);

    const pagination = Pagination.setPagination({
      ...dto,
      total,
    });
    const booksMapped = books.map(Book.fromObject);
    return { pagination, books: booksMapped };
  }
}
