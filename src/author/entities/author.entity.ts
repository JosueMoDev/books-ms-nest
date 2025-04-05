export class Author {
  public id?: string;
  public name: string;
  public lastName: string;
  public bio?: string;
  public isActive?: boolean;
  public birthdate?: Date;

  constructor({ id, name, lastName, bio, birthdate, isActive }: Author) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.bio = bio;
    this.isActive = isActive;
    this.birthdate = birthdate;
  }
  static fromObject(author: Author): Author {
    return new Author(author);
  }
}
