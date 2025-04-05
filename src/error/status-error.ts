export class StatusError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message.toUpperCase());
  }

  static badRequest(message: string) {
    return new StatusError(400, message);
  }

  static unauthorized(message: string) {
    return new StatusError(401, message);
  }

  static forbidden(message: string) {
    return new StatusError(403, message);
  }

  static notFound(message: string) {
    return new StatusError(404, message);
  }

  static internalServer(message: string) {
    return new StatusError(500, message.replace('Error:', ''));
  }
}
