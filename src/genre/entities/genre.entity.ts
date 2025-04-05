export class Genre {
  public id: string;
  public name: string;
  public isActive?: boolean;
  constructor({ id, name, isActive }: Genre) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
  }
  static fromObject(book: Genre): Genre {
    return new Genre(book);
  }
}
