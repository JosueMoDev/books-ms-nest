import { ValidationError, validateSync } from 'class-validator';

export class CustomValidatorErrors {
  static setErroMessages(error: ValidationError): any {
    if (error.constraints) return error.constraints;

    if (error.children[0].constraints)
      return error.children.map(({ constraints }) => constraints);

    if (error.children.length > 0)
      return error.children.map(({ children }): object => ({
        errorMessages: children[0].constraints,
        errorOnProperty: children[0].property,
      }));
  }
  static validateDto<T>(dto: T): [undefined | string[], T?] {
    const errors = validateSync(dto as object);
    if (errors !== undefined && errors.length > 0) {
      const errorsMapped = errors.map((error: ValidationError): any => ({
        errorOnProperty: error.property,
        errorMessages: this.setErroMessages(error),
      }));
      return [errorsMapped];
    }
    return [undefined, dto];
  }
}
