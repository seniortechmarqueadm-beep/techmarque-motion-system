import {describe, expect, it} from 'vitest';
import {
  FOUNDATION_PILOT_DURATION,
  FOUNDATION_PILOT_FPS,
  FOUNDATION_PILOT_HEIGHT,
  FOUNDATION_PILOT_SCENES,
  FOUNDATION_PILOT_WIDTH,
} from '../src/compositions/TechmarqueFoundationPilot';

describe('TechmarqueFoundationPilot composition contract', () => {
  it('uses a 12-second vertical social canvas', () => {
    expect(FOUNDATION_PILOT_WIDTH).toBe(1080);
    expect(FOUNDATION_PILOT_HEIGHT).toBe(1920);
    expect(FOUNDATION_PILOT_FPS).toBe(30);
    expect(FOUNDATION_PILOT_DURATION).toBe(360);
  });

  it('uses four contiguous deterministic scenes', () => {
    expect(FOUNDATION_PILOT_SCENES).toHaveLength(4);
    expect(FOUNDATION_PILOT_SCENES[0]?.from).toBe(0);

    for (let index = 1; index < FOUNDATION_PILOT_SCENES.length; index += 1) {
      expect(FOUNDATION_PILOT_SCENES[index]?.from).toBe(
        (FOUNDATION_PILOT_SCENES[index - 1]?.from ?? 0) +
          (FOUNDATION_PILOT_SCENES[index - 1]?.duration ?? 0),
      );
    }

    const last = FOUNDATION_PILOT_SCENES[FOUNDATION_PILOT_SCENES.length - 1];
    expect((last?.from ?? 0) + (last?.duration ?? 0)).toBe(FOUNDATION_PILOT_DURATION);
  });
});
