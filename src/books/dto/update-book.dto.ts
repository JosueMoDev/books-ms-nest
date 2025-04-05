import { CustomValidatorErrors } from '@handler-errors';
import {
  IsDate,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsDate({ message: 'Date must be in the format YYYY-MM-DD' })
  public publicationDate?: Date;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsPositive()
  @Min(0)
  public stock?: number;

  @IsOptional()
  @IsUUID()
  public authorId?: string;

  @IsOptional()
  @IsUUID()
  public genreId?: string;

  constructor(args: UpdateBookDto) {
    Object.assign(this, args);
    if (args.publicationDate)
      this.publicationDate = new Date(this.publicationDate);
  }

  static validate(
    object: UpdateBookDto,
  ): [undefined | string[], UpdateBookDto?] {
    const createDto = new UpdateBookDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<UpdateBookDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
