import { CustomValidatorErrors } from '@handler-errors';
import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto {
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @IsOptional()
  @IsString()
  public name?: string;

  constructor(args: UpdateGenreDto) {
    Object.assign(this, args);
  }

  static validate(
    object: UpdateGenreDto,
  ): [undefined | string[], UpdateGenreDto?] {
    const createDto = new UpdateGenreDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<UpdateGenreDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
