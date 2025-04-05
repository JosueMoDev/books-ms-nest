import { CustomValidatorErrors } from '@handler-errors';
import {
  IsDate,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAuthorDto {
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsString()
  public bio?: string;

  @IsOptional()
  @IsDate({ message: 'Date must be in the format YYYY-MM-DD' })
  public birthdate?: Date;

  constructor(args: UpdateAuthorDto) {
    Object.assign(this, args);
    if (args.birthdate) this.birthdate = new Date(this.birthdate);
  }

  static validate(
    object: UpdateAuthorDto,
  ): [undefined | string[], UpdateAuthorDto?] {
    const createDto = new UpdateAuthorDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<UpdateAuthorDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
