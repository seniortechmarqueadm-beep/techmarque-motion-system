import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CenteredLayout} from '../layouts/CenteredLayout';
import {Title} from '../typography/Title';
import {theme} from '../themes/defaultTheme';

export const TechmarqueMotionDemo = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const intro = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outro = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = intro * outro;
  const translateY = interpolate(intro, [0, 1], [28, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
      }}
    >
      <CenteredLayout>
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <Title>Techmarque Motion System</Title>
        </div>
      </CenteredLayout>
    </AbsoluteFill>
  );
};
