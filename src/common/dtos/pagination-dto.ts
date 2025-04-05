import { CustomValidatorErrors } from '@handler-errors';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1, { message: 'Page should be greater than 0' })
  public readonly page!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(5, { message: 'Limit should be greater than 5' })
  public readonly pageSize!: number;

  @IsNotEmpty()
  @IsString()
  public readonly path?: string;

  @IsOptional()
  @IsString()
  public readonly search?: string;

  private constructor({ page, pageSize, search }: PaginationDto, path: string) {
    this.page = page ? +page : 1;
    this.pageSize = pageSize ? +pageSize : 5;
    this.search = search;
    this.path = path.split('?')[0].replace(/^\/api/, '');
  }

  static validate(
    object: PaginationDto | any,
    path: string,
  ): [{ [key: string]: string }[] | string[] | undefined, PaginationDto?] {
    const createDto = new PaginationDto(object, path);

    const [errors, dto] =
      CustomValidatorErrors.validateDto<PaginationDto>(createDto);

    if (errors) return [errors];

    return [undefined, dto];
  }
}
