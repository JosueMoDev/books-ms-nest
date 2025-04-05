import { StatusError } from './status-error';

describe('StatusError', () => {
  it('should be defined', () => {
    expect(new StatusError()).toBeDefined();
  });
});
