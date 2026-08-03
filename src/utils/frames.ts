export const framesFromSeconds = (seconds: number, fps: number) => {
  return Math.round(seconds * fps);
};
