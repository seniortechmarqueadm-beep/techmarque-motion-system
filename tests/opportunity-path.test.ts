import {describe, expect, it} from 'vitest';
import {
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
  scenes,
} from '../src/compositions/TechmarqueOpportunityPath';

describe('TechmarqueOpportunityPath composition contract', () => {
  it('uses the approved vertical Remotion specs', () => {
    expect(WIDTH).toBe(1080);
    expect(HEIGHT).toBe(1920);
    expect(FPS).toBe(30);
    expect(DURATION_IN_FRAMES).toBe(1800);
  });

  it('covers the full 60-second timeline with seven deterministic scenes', () => {
    expect(scenes).toHaveLength(7);
    expect(scenes[0]?.from).toBe(0);

    for (let index = 1; index < scenes.length; index += 1) {
      expect(scenes[index]?.from).toBe(
        (scenes[index - 1]?.from ?? 0) + (scenes[index - 1]?.duration ?? 0),
      );
    }

    const last = scenes[scenes.length - 1];
    expect((last?.from ?? 0) + (last?.duration ?? 0)).toBe(DURATION_IN_FRAMES);
  });
});
