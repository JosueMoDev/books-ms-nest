import { CustomValidatorErrors } from '@handler-errors';
import {
  IsDate,
  IsUUID,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @IsNotEmpty()
  @IsDate({ message: 'Date must be in the format YYYY-MM-DD' })
  public publicationDate!: Date;

  @IsNotEmpty()
  @IsString()
  public description!: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  public stock!: number;

  @IsNotEmpty()
  @IsUUID()
  public authorId!: string;

  @IsNotEmpty()
  @IsUUID()
  public genreId!: string;

  constructor(args: CreateBookDto) {
    Object.assign(this, args);
    this.publicationDate = new Date(args.publicationDate);
  }

  static validate(
    object: CreateBookDto,
  ): [undefined | string[], CreateBookDto?] {
    const createDto = new CreateBookDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<CreateBookDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
