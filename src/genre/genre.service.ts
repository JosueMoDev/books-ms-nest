import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { StatusError } from '@handler-errors';
import { PaginationDto } from 'src/common/dtos/pagination-dto';
import { Pagination } from 'src/common/entities/pagination';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateGenreDto): Promise<Genre> {
    await this.checkIfNameExist(name);
    try {
      const genre = await this.prisma.genre.create({ data: { name } });
      return Genre.fromObject(genre);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async update({ id, name }: UpdateGenreDto): Promise<Genre> {
    if (!name) throw StatusError.badRequest('There is nothing to modify');
    try {
      await this.findOne(id);
      await this.checkIfNameExist(name);
      const genre = await this.prisma.genre.update({
        where: { id },
        data: { name },
      });
      return Genre.fromObject(genre);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async changeRecordStatus(id: string): Promise<object> {
    try {
      const { name, isActive } = await this.findOne(id);
      await this.prisma.genre.update({
        where: { id },
        data: {
          isActive: !isActive,
        },
      });
      return {
        message: `The genre ${name} was ${
          isActive ? 'disabled' : 'enabled'
        } successfully`,
      };
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }

  async findOne(id: string): Promise<Genre> {
    try {
      const genre = await this.prisma.genre.findFirst({ where: { id } });
      if (!genre) throw StatusError.badRequest('Genre not found');
      return Genre.fromObject(genre);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async findAll(
    dto: PaginationDto,
  ): Promise<{ pagination: Pagination; genres: Genre[] }> {
    try {
      const { page, pageSize } = dto;
      const [genres, total] = await Promise.all([
        this.prisma.genre.findMany({
          skip: Pagination.dinamycOffset(page, pageSize),
          take: pageSize,
        }),
        this.prisma.genre.count(),
      ]);

      const pagination = Pagination.setPagination({ ...dto, total });
      const genresMapped = genres.map(Genre.fromObject);
      return { pagination, genres: genresMapped };
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
  async checkIfNameExist(name: string) {
    try {
      const _name = await this.prisma.genre.findFirst({ where: { name } });
      if (_name) throw StatusError.badRequest(`${name} already exist`);
    } catch (error) {
      throw StatusError.internalServer(`${error}`);
    }
  }
}
