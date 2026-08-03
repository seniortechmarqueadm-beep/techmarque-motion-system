import type {CSSProperties, ReactNode} from 'react';
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

type CampaignProps = {
  city: string;
  logoSrc?: string;
  showSafeArea?: boolean;
};

type SceneTheme = 'paper' | 'graphite';

type SceneSpec = {
  key: string;
  label: string;
  from: number;
  duration: number;
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 1800;

export const scenes: SceneSpec[] = [
  {key: 'sf01', label: 'Mais uma tela', from: 0, duration: 180},
  {key: 'sf02', label: 'Jornada fragmentada', from: 180, duration: 300},
  {key: 'sf03', label: 'Contexto material', from: 480, duration: 210},
  {key: 'sf04', label: 'Oportunidade perdida', from: 690, duration: 240},
  {key: 'sf05', label: 'Torre de controle', from: 930, duration: 270},
  {key: 'sf06', label: 'Operação visível', from: 1200, duration: 390},
  {key: 'sf07', label: 'Síntese e CTA', from: 1590, duration: 210},
];

const c = theme.colors;
const font = theme.typography.bodyFontFamily;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const safe: CSSProperties = {
  position: 'absolute',
  top: 150,
  right: 92,
  bottom: 210,
  left: 92,
};

const panelBase: CSSProperties = {
  borderRadius: 28,
  boxSizing: 'border-box',
};

const useSceneProgress = (duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, duration - 1], [0, 1], clamp);
};

const SceneShell = ({
  children,
  scene,
  sceneTheme = 'paper',
  showSafeArea,
}: {
  children: ReactNode;
  scene: SceneSpec;
  sceneTheme?: SceneTheme;
  showSafeArea?: boolean;
}) => {
  const progress = useSceneProgress(scene.duration);
  const foreground = sceneTheme === 'paper' ? c.foreground : c.white;
  const muted = sceneTheme === 'paper' ? c.muted : '#c9c9c0';
  const rule = sceneTheme === 'paper' ? c.line : c.lineDark;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: sceneTheme === 'paper' ? c.paper : c.graphite,
        color: foreground,
        fontFamily: font,
        overflow: 'hidden',
      }}
    >
      <Texture sceneTheme={sceneTheme} />
      <div
        style={{
          position: 'absolute',
          left: 92,
          right: 92,
          top: 92,
          height: 2,
          backgroundColor: rule,
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 92,
          width: interpolate(progress, [0, 1], [0, WIDTH - 184], clamp),
          height: 2,
          backgroundColor: sceneTheme === 'paper' ? c.foreground : c.white,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 116,
          color: muted,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        Techmarque / O caminho da oportunidade
      </div>
      {showSafeArea ? <SafeAreaGuide /> : null}
      {children}
    </AbsoluteFill>
  );
};

const SafeAreaGuide = () => (
  <div
    style={{
      ...safe,
      border: `2px dashed ${c.red}`,
      opacity: 0.28,
      pointerEvents: 'none',
    }}
  />
);

const Texture = ({sceneTheme}: {sceneTheme: SceneTheme}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneTheme === 'paper' ? 0.85 : 0.42,
        background:
          sceneTheme === 'paper'
            ? `radial-gradient(circle at ${22 + Math.sin(frame / 160) * 4}% 18%, rgba(70,68,61,0.10), transparent 32%), radial-gradient(circle at 88% 78%, rgba(180,50,44,0.055), transparent 34%), repeating-linear-gradient(123deg, rgba(70,68,61,0.026) 0 1px, transparent 1px 12px)`
            : `radial-gradient(circle at ${75 + Math.cos(frame / 150) * 4}% 22%, rgba(244,241,234,0.08), transparent 30%), radial-gradient(circle at 20% 88%, rgba(180,50,44,0.10), transparent 35%), repeating-linear-gradient(123deg, rgba(244,241,234,0.022) 0 1px, transparent 1px 12px)`,
      }}
    />
  );
};

const Headline = ({
  children,
  support,
  align = 'left',
  tone = 'paper',
  start = 0,
}: {
  children: ReactNode;
  support?: ReactNode;
  align?: 'left' | 'center';
  tone?: SceneTheme;
  start?: number;
}) => {
  const frame = useCurrentFrame();
  const foreground = tone === 'paper' ? c.foreground : c.white;
  const muted = tone === 'paper' ? c.muted : '#c9c9c0';

  return (
    <div
      style={{
        opacity: interpolate(frame, [start, start + 18], [0, 1], {...clamp, easing: easeOut}),
        translate: `0 ${interpolate(frame, [start, start + 18], [34, 0], {
          ...clamp,
          easing: easeOut,
        })}px`,
        textAlign: align,
      }}
    >
      <div
        style={{
          color: foreground,
          fontSize: 86,
          fontWeight: 760,
          letterSpacing: -4.6,
          lineHeight: 0.96,
          whiteSpace: 'pre-line',
        }}
      >
        {children}
      </div>
      {support ? (
        <div
          style={{
            color: muted,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: -0.5,
            lineHeight: 1.22,
            marginTop: 26,
            maxWidth: align === 'center' ? 760 : 660,
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
            whiteSpace: 'pre-line',
          }}
        >
          {support}
        </div>
      ) : null}
    </div>
  );
};

const TechmarqueLogo = ({logoSrc, tone = 'paper'}: {logoSrc?: string; tone?: SceneTheme}) => {
  const foreground = tone === 'paper' ? c.foreground : c.white;

  if (logoSrc) {
    return (
      <Img
        src={staticFile(logoSrc)}
        style={{
          maxWidth: 420,
          maxHeight: 96,
          objectFit: 'contain',
        }}
      />
    );
  }

  return (
    <div
      style={{
        color: foreground,
        fontSize: 58,
        fontWeight: 780,
        letterSpacing: -2.7,
        lineHeight: 1,
      }}
    >
      Techmarque
    </div>
  );
};

const Pill = ({
  children,
  tone = 'neutral',
  dark = false,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'alert' | 'success' | 'info';
  dark?: boolean;
}) => {
  const color =
    tone === 'alert'
      ? c.red
      : tone === 'success'
        ? c.green
        : tone === 'info'
          ? c.blue
          : dark
            ? c.white
            : c.foreground;
  const background =
    tone === 'alert'
      ? c.redSoft
      : tone === 'success'
        ? 'rgba(65,106,80,0.16)'
        : tone === 'info'
          ? 'rgba(90,124,168,0.16)'
          : dark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(23,24,20,0.07)';

  return (
    <div
      style={{
        alignItems: 'center',
        background,
        borderRadius: 999,
        color,
        display: 'inline-flex',
        fontSize: 26,
        fontWeight: 760,
        letterSpacing: 0.1,
        padding: '12px 18px',
      }}
    >
      {children}
    </div>
  );
};

const PaperCard = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      ...panelBase,
      backgroundColor: 'rgba(251,250,246,0.92)',
      border: '1px solid rgba(23,24,20,0.10)',
      boxShadow: '0 26px 70px rgba(49,46,39,0.12)',
      ...style,
    }}
  >
    {children}
  </div>
);

const DarkCard = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      ...panelBase,
      backgroundColor: 'rgba(255,255,255,0.075)',
      border: '1px solid rgba(251,250,246,0.14)',
      boxShadow: '0 28px 76px rgba(0,0,0,0.22)',
      ...style,
    }}
  >
    {children}
  </div>
);

const Label = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => (
  <div
    style={{
      color: dark ? '#c9c9c0' : c.muted,
      fontSize: 21,
      fontWeight: 780,
      letterSpacing: 2.3,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const OpportunitySignal = ({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      height: 28,
      width: 28,
      borderRadius: 999,
      backgroundColor: c.red,
      boxShadow: '0 0 0 12px rgba(180,50,44,0.12)',
      opacity,
      scale,
    }}
  />
);

const DrawLine = ({
  x1,
  y1,
  x2,
  y2,
  progress,
  color = c.red,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  color?: string;
  dashed?: boolean;
}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        width: length * progress,
        height: 3,
        backgroundColor: color,
        backgroundImage: dashed
          ? `linear-gradient(90deg, ${color} 0 55%, transparent 55% 100%)`
          : undefined,
        backgroundSize: dashed ? '18px 3px' : undefined,
        opacity: 0.92,
        rotate: `${angle}deg`,
        transformOrigin: '0 50%',
      }}
    />
  );
};

const BrowserMock = () => {
  const frame = useCurrentFrame();

  return (
    <PaperCard
      style={{
        height: 640,
        padding: 34,
        position: 'relative',
        width: '100%',
      }}
    >
      <div style={{display: 'flex', gap: 10}}>
        {[c.red, c.yellow, c.green].map((color) => (
          <div key={color} style={{backgroundColor: color, borderRadius: 999, height: 14, width: 14}} />
        ))}
      </div>
      <div style={{height: 2, backgroundColor: c.line, marginTop: 24}} />
      <div
        style={{
          opacity: interpolate(frame, [12, 30], [0, 1], {...clamp, easing: easeOut}),
          translate: `0 ${interpolate(frame, [12, 30], [28, 0], {
            ...clamp,
            easing: easeOut,
          })}px`,
        }}
      >
        <div style={{height: 38, width: '72%', borderRadius: 12, marginTop: 46, backgroundColor: '#c9c2b6'}} />
        <div style={{height: 24, width: '48%', borderRadius: 12, marginTop: 15, backgroundColor: '#ded8ce'}} />
        <div style={{display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 58}}>
          {['Serviço', 'Materiais', 'Contato'].map((item, index) => (
            <div
              key={item}
              style={{
                borderRadius: 18,
                backgroundColor: index === 2 ? '#dbe5d9' : c.paperDeep,
                height: 150,
                padding: 18,
              }}
            >
              <Label>{item}</Label>
            </div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 32, right: 34}}>
        <Pill>tela isolada</Pill>
      </div>
    </PaperCard>
  );
};

const FieldRow = ({
  label,
  value,
  alert = false,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) => (
  <div
    style={{
      alignItems: 'center',
      borderTop: `1px solid ${c.lineDark}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '22px 0',
    }}
  >
    <Label dark>{label}</Label>
    <div style={{color: alert ? c.red : c.white, fontSize: 32, fontWeight: 760}}>{value}</div>
  </div>
);

const SceneOne = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell scene={scene}>
      <div style={safe}>
        <Headline support={`Marmorarias em Cachoeiro não procuram um site só por isso.`}>
          {'Não é sobre\nmais uma tela.'}
        </Headline>
        <div
          style={{
            opacity: interpolate(frame, [22, 44], [0, 1], {...clamp, easing: easeOut}),
            position: 'absolute',
            top: 470,
            width: '100%',
            translate: `0 ${interpolate(frame, [22, 44], [46, 0], {
              ...clamp,
              easing: easeOut,
            })}px`,
          }}
        >
          <BrowserMock />
        </div>
        <OpportunitySignal
          x={interpolate(frame, [110, 165], [720, 640], {...clamp, easing: easeInOut})}
          y={interpolate(frame, [110, 165], [1040, 1120], {...clamp, easing: easeInOut})}
          opacity={interpolate(frame, [82, 108], [0, 1], clamp)}
        />
      </div>
    </SceneShell>
  );
};

const SceneTwo = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();
  const items = [
    {label: 'Pesquisa', x: 20, y: 370, delay: 10},
    {label: 'Compara', x: 430, y: 320, delay: 24},
    {label: 'Medidas', x: 75, y: 560, delay: 38},
    {label: 'Fotos', x: 500, y: 620, delay: 52},
    {label: 'Preço', x: 10, y: 790, delay: 66},
    {label: 'Decide depois', x: 335, y: 890, delay: 80},
  ];

  const lineProgress = interpolate(frame, [30, 124], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell scene={scene}>
      <div style={safe}>
        <Headline support="A oportunidade existe, mas ainda está espalhada entre busca, conversa, medida e orçamento.">
          {'A jornada\nfica fragmentada.'}
        </Headline>
        <div style={{position: 'absolute', inset: 0, top: 300}}>
          <DrawLine x1={82} y1={178} x2={490} y2={128} progress={lineProgress} dashed />
          <DrawLine x1={490} y1={128} x2={145} y2={365} progress={lineProgress} dashed />
          <DrawLine x1={145} y1={365} x2={570} y2={430} progress={lineProgress} dashed />
          <DrawLine x1={570} y1={430} x2={92} y2={600} progress={lineProgress} dashed />
          <DrawLine x1={92} y1={600} x2={485} y2={700} progress={lineProgress} dashed />
          {items.map((item) => (
            <PaperCard
              key={item.label}
              style={{
                opacity: interpolate(frame, [item.delay, item.delay + 18], [0, 1], {
                  ...clamp,
                  easing: easeOut,
                }),
                padding: '24px 26px',
                position: 'absolute',
                left: item.x,
                top: item.y,
                translate: `0 ${interpolate(frame, [item.delay, item.delay + 18], [26, 0], {
                  ...clamp,
                  easing: easeOut,
                })}px`,
              }}
            >
              <div style={{fontSize: item.label.length > 10 ? 32 : 36, fontWeight: 760}}>{item.label}</div>
            </PaperCard>
          ))}
          <OpportunitySignal
            x={interpolate(frame, [28, 128], [82, 485], {...clamp, easing: easeInOut})}
            y={interpolate(frame, [28, 128], [178, 700], {...clamp, easing: easeInOut})}
          />
        </div>
      </div>
    </SceneShell>
  );
};

const SceneThree = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell scene={scene}>
      <div style={safe}>
        <Headline support="Medida, referência visual e preço fazem parte de uma compra que amadurece depois.">
          {'A decisão não acontece\nno primeiro contato.'}
        </Headline>
        <PaperCard
          style={{
            height: 700,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 470,
            width: '100%',
          }}
        >
          <div
            style={{
              height: '100%',
              position: 'relative',
              background:
                'linear-gradient(135deg, #d6d0c5 0%, #f0ece4 42%, #bdb6aa 100%)',
            }}
          >
            {[0, 1, 2, 3, 4].map((line) => (
              <div
                key={line}
                style={{
                  position: 'absolute',
                  height: 2,
                  width: 900,
                  left: -120,
                  top: 120 + line * 115,
                  backgroundColor: 'rgba(23,24,20,0.13)',
                  rotate: `${-18 + line * 4}deg`,
                }}
              />
            ))}
            <div
              style={{
                opacity: interpolate(frame, [35, 58], [0, 1], clamp),
                position: 'absolute',
                left: 70,
                right: 70,
                top: 120,
                bottom: 130,
                border: `2px solid ${c.foreground}`,
                borderStyle: 'dashed',
              }}
            />
            <div style={{position: 'absolute', left: 70, top: 72}}>
              <Pill>medição + referência</Pill>
            </div>
            <div style={{position: 'absolute', right: 70, bottom: 62}}>
              <Pill tone="alert">preço em espera</Pill>
            </div>
            <OpportunitySignal
              x={interpolate(frame, [70, 160], [118, 646], {...clamp, easing: easeInOut})}
              y={interpolate(frame, [70, 160], [460, 530], {...clamp, easing: easeInOut})}
            />
          </div>
        </PaperCard>
      </div>
    </SceneShell>
  );
};

const SceneFour = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();
  const breakAmount = interpolate(frame, [85, 130], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell scene={scene} sceneTheme="paper">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, transparent 0%, transparent ${58 - breakAmount * 24}%, ${c.graphite} ${71 - breakAmount * 16}%, ${c.graphite} 100%)`,
        }}
      />
      <div style={safe}>
        <Headline support="O problema é a ausência de contexto, dono e próximo passo.">
          {'A oportunidade não desaparece.\nEla se perde no caminho.'}
        </Headline>
        <DarkCard
          style={{
            backgroundColor: c.graphiteSoft,
            bottom: 80,
            left: 0,
            padding: 34,
            position: 'absolute',
            right: 0,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
            <Label dark>Registro da oportunidade</Label>
            <Pill tone="alert" dark>
              retorno vencido
            </Pill>
          </div>
          <FieldRow label="Origem" value="Google" />
          <FieldRow label="Responsável" value="—" alert />
          <FieldRow label="Orçamento" value="pendente" alert />
          <FieldRow label="Próxima ação" value="não definida" alert />
        </DarkCard>
        <DrawLine x1={40} y1={760} x2={365} y2={760} progress={1 - breakAmount * 0.55} color={c.foreground} />
        <DrawLine x1={520} y1={760} x2={756} y2={760} progress={1 - breakAmount * 0.85} color={c.foreground} />
        <OpportunitySignal x={382} y={746} scale={interpolate(frame, [92, 132], [1, 0.78], clamp)} />
      </div>
    </SceneShell>
  );
};

const SceneFive = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [10, 95], [0.18, 0.62], {...clamp, easing: easeInOut});
  const travel = interpolate(frame, [60, 185], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell scene={scene} sceneTheme="graphite">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, ${c.paper} 0%, ${c.paper} ${split * 100}%, ${c.graphite} ${split * 100 + 0.2}%, ${c.graphite} 100%)`,
        }}
      />
      <div style={safe}>
        <div style={{maxWidth: 720}}>
          <Headline tone={split > 0.45 ? 'graphite' : 'paper'} support="A operação precisa enxergar a jornada.">
            {'Visibilidade\nmuda o caminho.'}
          </Headline>
        </div>
        <PaperCard
          style={{
            left: 0,
            padding: 26,
            position: 'absolute',
            top: 540,
            width: 330,
          }}
        >
          <Label>jornada externa</Label>
          <div style={{fontSize: 34, fontWeight: 760, marginTop: 24}}>mensagem + medidas</div>
        </PaperCard>
        <DarkCard
          style={{
            padding: 26,
            position: 'absolute',
            right: 0,
            top: 510,
            width: 390,
          }}
        >
          <Label dark>operação interna</Label>
          <div style={{fontSize: 34, fontWeight: 760, marginTop: 24, color: c.white}}>origem + status</div>
          <div style={{marginTop: 22}}>
            <Pill tone="info" dark>
              em leitura
            </Pill>
          </div>
        </DarkCard>
        <DrawLine x1={310} y1={640} x2={635} y2={620} progress={travel} />
        <OpportunitySignal
          x={interpolate(travel, [0, 1], [300, 638], clamp)}
          y={interpolate(travel, [0, 1], [626, 606], clamp)}
        />
      </div>
    </SceneShell>
  );
};

const MiniModule = ({
  label,
  value,
  tone = 'neutral',
  delay,
}: {
  label: string;
  value: string;
  tone?: 'neutral' | 'alert' | 'success' | 'info';
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const accent = tone === 'alert' ? c.red : tone === 'success' ? c.green : tone === 'info' ? c.blue : c.lineDark;

  return (
    <DarkCard
      style={{
        opacity: interpolate(frame, [delay, delay + 18], [0, 1], {...clamp, easing: easeOut}),
        padding: 24,
        translate: `0 ${interpolate(frame, [delay, delay + 18], [24, 0], {
          ...clamp,
          easing: easeOut,
        })}px`,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', gap: 18}}>
        <Label dark>{label}</Label>
        <div style={{height: 14, width: 14, backgroundColor: accent, borderRadius: 999, marginTop: 5}} />
      </div>
      <div style={{color: c.white, fontSize: 31, fontWeight: 760, letterSpacing: -0.7, marginTop: 24}}>{value}</div>
    </DarkCard>
  );
};

const SceneSix = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [46, 130], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell scene={scene} sceneTheme="graphite">
      <div style={safe}>
        <Headline tone="graphite" support="Site, busca local, automação e sistema só importam quando criam responsabilidade e próximo passo.">
          {'Origem. Etapa.\nResponsável. Próximo passo.'}
        </Headline>
        <DarkCard
          style={{
            left: 0,
            padding: 34,
            position: 'absolute',
            right: 0,
            top: 420,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Label dark>oportunidade / bancada sob medida</Label>
            <Pill tone="success" dark>
              em acompanhamento
            </Pill>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 34}}>
            <MiniModule label="Origem" value="Busca local" tone="info" delay={20} />
            <MiniModule label="Etapa" value="Orçamento enviado" tone="success" delay={34} />
            <MiniModule label="Responsável" value="Comercial" delay={48} />
            <MiniModule label="Próximo passo" value="Retornar quinta" tone="alert" delay={62} />
          </div>
        </DarkCard>
        <DarkCard
          style={{
            bottom: 92,
            left: 0,
            padding: 28,
            position: 'absolute',
            right: 0,
          }}
        >
          <Label dark>linha de continuidade</Label>
          <div style={{height: 150, position: 'relative', marginTop: 34}}>
            {['Busca', 'Atendimento', 'Orçamento', 'Follow-up'].map((step, index) => (
              <div key={step} style={{position: 'absolute', left: index * 225, top: 54, textAlign: 'center'}}>
                <div
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 999,
                    backgroundColor: interpolate(draw, [index * 0.22, index * 0.22 + 0.18], [0, 1], clamp) > 0.7 ? c.red : c.lineDark,
                    margin: '0 auto 18px',
                  }}
                />
                <div style={{color: c.white, fontSize: 25, fontWeight: 760}}>{step}</div>
              </div>
            ))}
            <DrawLine x1={94} y1={68} x2={700} y2={68} progress={draw} color={c.red} />
          </div>
        </DarkCard>
      </div>
    </SceneShell>
  );
};

const SceneSeven = ({scene, logoSrc}: {scene: SceneSpec; logoSrc?: string}) => {
  const frame = useCurrentFrame();
  const steps = ['Busca', 'Atendimento', 'Orçamento', 'Acompanhamento', 'Operação clara'];
  const draw = interpolate(frame, [18, 92], [0, 1], {...clamp, easing: easeInOut});
  const positions = [70, 230, 390, 550, 710];

  return (
    <SceneShell scene={scene}>
      <div style={safe}>
        <Headline align="center" support="A Techmarque estrutura tecnologia para organizar esse caminho.">
          {'Busca vira\noperação clara.'}
        </Headline>
        <div style={{position: 'absolute', left: 8, right: 8, top: 520, height: 360}}>
          <DrawLine x1={68} y1={135} x2={710} y2={135} progress={draw} />
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                opacity: interpolate(frame, [20 + index * 12, 38 + index * 12], [0, 1], {
                  ...clamp,
                  easing: easeOut,
                }),
                position: 'absolute',
                left: positions[index] ?? 0,
                top: 0,
                textAlign: 'center',
                width: 150,
              }}
            >
              <div
                style={{
                  backgroundColor: index === steps.length - 1 ? c.green : c.red,
                  borderRadius: 999,
                  height: 26,
                  left: 62,
                  position: 'absolute',
                  top: 122,
                  width: 26,
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 780,
                  left: 0,
                  lineHeight: 1.02,
                  position: 'absolute',
                  right: 0,
                  top: index % 2 === 0 ? 168 : 42,
                }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            alignItems: 'center',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            left: 0,
            opacity: interpolate(frame, [82, 122], [0, 1], {...clamp, easing: easeOut}),
            position: 'absolute',
            right: 0,
            textAlign: 'center',
            translate: `0 ${interpolate(frame, [82, 122], [30, 0], {
              ...clamp,
              easing: easeOut,
            })}px`,
          }}
        >
          <div
            style={{
              backgroundColor: c.foreground,
              borderRadius: 18,
              color: c.white,
              fontSize: 34,
              fontWeight: 780,
              letterSpacing: -0.4,
              marginBottom: 58,
              padding: '22px 32px',
            }}
          >
            Comece pelo diagnóstico
          </div>
          <TechmarqueLogo logoSrc={logoSrc} />
          <div style={{height: 3, width: 360, backgroundColor: c.foreground, marginTop: 26}} />
          <div style={{color: c.muted, fontSize: 27, fontWeight: 700, letterSpacing: 1.1, marginTop: 22}}>
            Diagnóstico antes da proposta
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

export const TechmarqueOpportunityPath = ({city, logoSrc, showSafeArea = false}: CampaignProps) => {
  return (
    <AbsoluteFill>
      <Sequence from={scenes[0].from} durationInFrames={scenes[0].duration}>
        <SceneOne scene={scenes[0]} />
      </Sequence>
      <Sequence from={scenes[1].from} durationInFrames={scenes[1].duration}>
        <SceneTwo scene={scenes[1]} />
      </Sequence>
      <Sequence from={scenes[2].from} durationInFrames={scenes[2].duration}>
        <SceneThree scene={scenes[2]} />
      </Sequence>
      <Sequence from={scenes[3].from} durationInFrames={scenes[3].duration}>
        <SceneFour scene={scenes[3]} />
      </Sequence>
      <Sequence from={scenes[4].from} durationInFrames={scenes[4].duration}>
        <SceneFive scene={scenes[4]} />
      </Sequence>
      <Sequence from={scenes[5].from} durationInFrames={scenes[5].duration}>
        <SceneSix scene={scenes[5]} />
      </Sequence>
      <Sequence from={scenes[6].from} durationInFrames={scenes[6].duration}>
        <SceneSeven scene={scenes[6]} logoSrc={logoSrc} />
      </Sequence>
      <div
        style={{
          bottom: 78,
          color: 'rgba(104,104,95,0.72)',
          fontFamily: font,
          fontSize: 18,
          fontWeight: 700,
          left: 92,
          letterSpacing: 1.5,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        Marmorarias em {city}
      </div>
      {showSafeArea ? <SafeAreaGuide /> : null}
    </AbsoluteFill>
  );
};
