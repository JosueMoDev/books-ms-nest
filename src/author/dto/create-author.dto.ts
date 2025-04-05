import { CustomValidatorErrors } from '@handler-errors';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsNotEmpty()
  @IsString()
  public lastName!: string;

  @IsNotEmpty()
  @IsString()
  public bio!: string;

  @IsNotEmpty()
  @IsDate({ message: 'Date must be in the format YYYY-MM-DD' })
  public birthdate!: Date;

  constructor(args: CreateAuthorDto) {
    Object.assign(this, args);
    this.birthdate = new Date(args.birthdate);
  }

  static validate(
    object: CreateAuthorDto,
  ): [undefined | string[], CreateAuthorDto?] {
    const createDto = new CreateAuthorDto(object);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<CreateAuthorDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
