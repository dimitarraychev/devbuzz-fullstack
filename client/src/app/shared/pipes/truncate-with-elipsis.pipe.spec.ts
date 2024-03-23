import { TruncateWithElipsisPipe } from './truncate-with-elipsis.pipe';

describe('TruncateWithElipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateWithElipsisPipe();
    expect(pipe).toBeTruthy();
  });
});
