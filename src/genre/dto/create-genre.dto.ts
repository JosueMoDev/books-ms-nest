import { CustomValidatorErrors } from '@handler-errors';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  constructor(args: CreateGenreDto) {
    Object.assign(this, args);
  }

  static validate(
    object: CreateGenreDto,
  ): [undefined | string[], CreateGenreDto?] {
    const createDto = new CreateGenreDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<CreateGenreDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
