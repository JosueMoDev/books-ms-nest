import { HandlerError } from './handler-error';

describe('HandlerError', () => {
  it('should be defined', () => {
    expect(new HandlerError()).toBeDefined();
  });
});
