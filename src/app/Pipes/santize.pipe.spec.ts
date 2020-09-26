import { SantizePipe } from './santize.pipe';

describe('SantizePipe', () => {
  it('create an instance', () => {
    const pipe = new SantizePipe();
    expect(pipe).toBeTruthy();
  });
});
