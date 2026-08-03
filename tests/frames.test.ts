import {describe, expect, it} from 'vitest';
import {framesFromSeconds} from '../src/utils/frames';

describe('framesFromSeconds', () => {
  it('converts seconds to frames using the selected fps', () => {
    expect(framesFromSeconds(5, 30)).toBe(150);
  });
});
