import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';

export class Book {
  public id: string;
  public title: string;
  public publicationDate: Date;
  public description: string;
  public coverImageUrl?: string | null;
  public stock?: number;
  public author: Pick<Author, 'name' | 'id' | 'lastName'>;
  public genre: Genre;
  public isActive?: boolean;
  public seeDetails?: string;
  constructor({
    id,
    title,
    publicationDate,
    description,
    coverImageUrl,
    stock,
    author,
    genre,
    isActive,
  }: Book) {
    this.id = id;
    this.title = title;
    this.publicationDate = publicationDate;
    this.description = description;
    this.coverImageUrl = coverImageUrl;
    this.stock = stock;
    this.author = author;
    this.genre = genre;
    this.isActive = isActive;
    if (!author) this.seeDetails = `/books/find-one/${id}`;
  }
  static fromObject(book: Book): Book {
    return new Book(book);
  }
}
