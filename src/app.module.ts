import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { CommomModule } from './common/common.module';

@Module({
  imports: [BooksModule, AuthorModule, GenreModule, CommomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
