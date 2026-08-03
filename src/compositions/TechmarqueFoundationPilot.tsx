import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {theme} from '../themes/defaultTheme';

export const FOUNDATION_PILOT_WIDTH = 1080;
export const FOUNDATION_PILOT_HEIGHT = 1920;
export const FOUNDATION_PILOT_FPS = 30;
export const FOUNDATION_PILOT_DURATION = 360;

export const FOUNDATION_PILOT_SCENES = [
  {id: 'signal', from: 0, duration: 75},
  {id: 'structure', from: 75, duration: 90},
  {id: 'production', from: 165, duration: 105},
  {id: 'resolution', from: 270, duration: 90},
] as const;

const fontFamily = theme.typography.headingFontFamily;

const SceneLabel = ({index, title}: {index: string; title: string}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      fontFamily,
      fontSize: 24,
      fontWeight: 700,
      gap: 18,
      letterSpacing: 4,
      textTransform: 'uppercase',
    }}
  >
    <span style={{color: theme.colors.red}}>{index}</span>
    <span style={{color: theme.colors.muted}}>{title}</span>
  </div>
);

const SignalScene = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 62, 74], [1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        padding: '210px 96px 160px',
      }}
    >
      <SceneLabel index="01" title="Sinal" />
      <div style={{flex: 1}} />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: 520,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: theme.colors.redSoft,
            border: `2px solid ${theme.colors.red}`,
            borderRadius: 999,
            height: 320,
            opacity: interpolate(frame, [0, 28, 74], [0.2, 0.9, 0.25], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [0, 74], [0.58, 1.18], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            position: 'absolute',
            width: 320,
          }}
        />
        <div
          style={{
            backgroundColor: theme.colors.red,
            borderRadius: 999,
            boxShadow: '0 0 80px rgba(180, 50, 44, 0.35)',
            height: 28,
            scale: interpolate(frame, [8, 34], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 180}),
            }),
            width: 28,
          }}
        />
      </div>
      <div
        style={{
          color: theme.colors.foreground,
          fontFamily,
          fontSize: 144,
          fontWeight: 800,
          letterSpacing: -7,
          lineHeight: 0.9,
          opacity: interpolate(frame, [12, 34], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [12, 34], ['0px 70px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        UMA IDEIA
        <br />
        É SÓ O INÍCIO.
      </div>
    </AbsoluteFill>
  );
};

const StructureScene = () => {
  const frame = useCurrentFrame();
  const items = ['RACIOCÍNIO', 'ROTEIRO', 'ESTRUTURA'];

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 78, 89], [1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        padding: '210px 96px 160px',
      }}
    >
      <SceneLabel index="02" title="Direção" />
      <div
        style={{
          color: theme.colors.foreground,
          fontFamily,
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 0.96,
          marginTop: 170,
          maxWidth: 820,
        }}
      >
        {'DIRE\u00c7\u00c3O TRANSFORMA SINAL EM SISTEMA.'}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 130}}>
        {items.map((item, index) => (
          <div
            key={item}
            style={{
              alignItems: 'center',
              backgroundColor: index === 1 ? theme.colors.graphite : theme.colors.white,
              border: `1px solid ${index === 1 ? theme.colors.graphite : theme.colors.line}`,
              color: index === 1 ? theme.colors.white : theme.colors.foreground,
              display: 'flex',
              fontFamily,
              fontSize: 40,
              fontWeight: 750,
              height: 150,
              justifyContent: 'space-between',
              letterSpacing: 2,
              opacity: interpolate(frame, [10 + index * 10, 28 + index * 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              padding: '0 44px',
              translate: interpolate(
                frame,
                [10 + index * 10, 28 + index * 10],
                ['70px 0px', '0px 0px'],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
            }}
          >
            <span>{item}</span>
            <span style={{color: index === 1 ? theme.colors.yellow : theme.colors.red}}>
              0{index + 1}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ProductionScene = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 92, 104], [1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        padding: '210px 96px 160px',
      }}
    >
      <SceneLabel index="03" title="Produção" />
      <div
        style={{
          backgroundColor: theme.colors.graphite,
          borderRadius: 10,
          color: theme.colors.white,
          fontFamily,
          marginTop: 155,
          minHeight: 850,
          overflow: 'hidden',
          padding: '54px 50px',
          scale: interpolate(frame, [0, 24], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{color: theme.colors.yellow, fontSize: 24, letterSpacing: 3}}>
          TASK_HANDOFF.yaml
        </div>
        <div style={{fontSize: 64, fontWeight: 800, letterSpacing: -2, marginTop: 80}}>
          {'DIRE\u00c7\u00c3O APROVADA'}
        </div>
        <div style={{backgroundColor: theme.colors.lineDark, height: 1, margin: '52px 0'}} />
        {[
          ['LOCKED', 'IDENTIDADE'],
          ['CONTROLLED', 'TIMING'],
          ['OPEN', 'MICRO-MOTION'],
        ].map(([key, value], index) => (
          <div
            key={key}
            style={{
              display: 'grid',
              fontSize: 28,
              gridTemplateColumns: '240px 1fr',
              marginBottom: 34,
              opacity: interpolate(frame, [22 + index * 9, 38 + index * 9], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <span style={{color: theme.colors.red}}>{key}</span>
            <span>{value}</span>
          </div>
        ))}
        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.white,
            color: theme.colors.graphite,
            display: 'flex',
            fontSize: 32,
            fontWeight: 800,
            height: 150,
            justifyContent: 'space-between',
            marginTop: 82,
            opacity: interpolate(frame, [40, 58], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            padding: '0 38px',
            translate: interpolate(frame, [40, 58], ['0px 45px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <span>REMOTION / RENDER</span>
          <span style={{color: theme.colors.green}}>PASS</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ResolutionScene = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        opacity: interpolate(frame, [0, 89], [1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        padding: '210px 96px 190px',
      }}
    >
      <Img
        src={staticFile('logos/techmarque-symbol-red.png')}
        style={{
          height: 104,
          marginBottom: 100,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 28], [0.72, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 180}),
          }),
          width: 104,
        }}
      />
      <div
        style={{
          color: theme.colors.foreground,
          fontFamily,
          fontSize: 126,
          fontWeight: 850,
          letterSpacing: -7,
          lineHeight: 0.89,
          maxWidth: 900,
          translate: interpolate(frame, [8, 34], ['0px 80px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        DA IDEIA AO CRIATIVO COMPLETO.
      </div>
      <div
        style={{
          color: theme.colors.red,
          fontFamily,
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 5,
          marginTop: 82,
          opacity: interpolate(frame, [30, 52], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          textTransform: 'uppercase',
        }}
      >
        Direção · Código · Movimento
      </div>
    </AbsoluteFill>
  );
};

export const TechmarqueFoundationPilot = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.paper,
        backgroundImage:
          'radial-gradient(circle at 82% 12%, rgba(180, 50, 44, 0.12), transparent 32%), linear-gradient(rgba(23, 24, 20, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23, 24, 20, 0.045) 1px, transparent 1px)',
        backgroundPosition: '0 0, 0 0, 0 0',
        backgroundSize: 'auto, 54px 54px, 54px 54px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.red,
          height: 8,
          left: 0,
          position: 'absolute',
          scale: `${interpolate(frame, [0, FOUNDATION_PILOT_DURATION - 1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })} 1`,
          top: 0,
          transformOrigin: 'left center',
          width: '100%',
        }}
      />
      <div
        style={{
          color: theme.colors.muted,
          fontFamily,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          position: 'absolute',
          right: 54,
          rotate: '90deg',
          textTransform: 'uppercase',
          top: 620,
          transformOrigin: 'right top',
          zIndex: 10,
        }}
      >
        Techmarque Motion System / Foundation 01
      </div>
      <Sequence from={0} durationInFrames={75}>
        <SignalScene />
      </Sequence>
      <Sequence from={75} durationInFrames={90}>
        <StructureScene />
      </Sequence>
      <Sequence from={165} durationInFrames={105}>
        <ProductionScene />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <ResolutionScene />
      </Sequence>
    </AbsoluteFill>
  );
};
