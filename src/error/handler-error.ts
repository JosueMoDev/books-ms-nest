import { StatusError } from './status-error';

export class HandlerError {
  static hasError(error: unknown) {
    if (error instanceof StatusError) {
      return { statusCode: error.statusCode, errorMessage: error.message };
    }
    console.log(`${error}`);
    return { statusCode: 500, errorMessage: 'Internal Server Error' };
  }
}
