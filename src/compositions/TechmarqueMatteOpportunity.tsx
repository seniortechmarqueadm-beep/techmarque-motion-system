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

export const MATTE_FPS = 30;
export const MATTE_WIDTH = 1080;
export const MATTE_HEIGHT = 1920;
export const MATTE_DURATION = 1980;

type FilmProps = {
  city: string;
  showSafeArea?: boolean;
};

type SceneEntry = {
  id: string;
  title: string;
  duration: number;
  component: () => ReactNode;
};

const color = {
  black: '#0b0d0e',
  graphite: '#121517',
  graphiteLift: '#1a1e20',
  panel: 'rgba(22, 26, 28, 0.92)',
  panelSoft: 'rgba(32, 37, 39, 0.82)',
  bone: '#e7e5df',
  muted: '#92948e',
  rule: 'rgba(231, 229, 223, 0.16)',
  red: '#d52b21',
  redSoft: 'rgba(213, 43, 33, 0.16)',
  granite: '#242827',
  marble: '#c7c4bb',
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const safe: CSSProperties = {
  position: 'absolute',
  left: 84,
  right: 84,
  top: 132,
  bottom: 140,
};

const entrance = (frame: number, from = 0, duration = 18) => ({
  opacity: interpolate(frame, [from, from + duration], [0, 1], {...clamp, easing: easeOut}),
  translate: `0 ${interpolate(frame, [from, from + duration], [32, 0], {
    ...clamp,
    easing: easeOut,
  })}px`,
});

const SceneShell = ({
  children,
  index,
  label,
  showSafeArea = false,
}: {
  children: ReactNode;
  index: string;
  label: string;
  showSafeArea?: boolean;
}) => {
  const frame = useCurrentFrame();
  const grainShift = Math.sin(frame / 47) * 3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.black,
        color: color.bone,
        fontFamily: 'Inter, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.68,
          background: `radial-gradient(circle at ${24 + grainShift}% 12%, rgba(255,255,255,0.055), transparent 25%), radial-gradient(circle at 82% 84%, rgba(213,43,33,0.075), transparent 33%), repeating-linear-gradient(123deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 12px)`,
        }}
      />
      <div style={{position: 'absolute', left: 84, right: 84, top: 70, height: 1, backgroundColor: color.rule}} />
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 70,
          height: 1,
          width: interpolate(frame, [0, 36], [0, 250], {...clamp, easing: easeOut}),
          backgroundColor: color.red,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 84,
          top: 91,
          color: color.muted,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
        }}
      >
        {index} / {label}
      </div>
      {children}
      {showSafeArea ? (
        <div
          style={{
            ...safe,
            border: `1px dashed ${color.red}`,
            opacity: 0.55,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const Title = ({
  children,
  support,
  frame,
  from = 0,
  align = 'left',
  size = 92,
}: {
  children: ReactNode;
  support?: ReactNode;
  frame: number;
  from?: number;
  align?: 'left' | 'center';
  size?: number;
}) => (
  <div style={{...entrance(frame, from, 20), textAlign: align}}>
    <div
      style={{
        fontSize: size,
        fontWeight: 760,
        letterSpacing: -4.8,
        lineHeight: 0.95,
        maxWidth: align === 'center' ? 840 : 810,
        margin: align === 'center' ? '0 auto' : undefined,
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </div>
    {support ? (
      <div
        style={{
          color: color.muted,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: -0.5,
          lineHeight: 1.18,
          maxWidth: align === 'center' ? 720 : 690,
          margin: align === 'center' ? '28px auto 0' : '28px 0 0',
          whiteSpace: 'pre-line',
        }}
      >
        {support}
      </div>
    ) : null}
  </div>
);

const Panel = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      backgroundColor: color.panel,
      border: `1px solid ${color.rule}`,
      borderRadius: 26,
      boxShadow: '0 18px 60px rgba(0,0,0,0.32)',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const Eyebrow = ({children, red = false}: {children: ReactNode; red?: boolean}) => (
  <div
    style={{
      color: red ? color.red : color.muted,
      fontSize: 20,
      fontWeight: 760,
      letterSpacing: 2.15,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const Signal = ({x, y, scale = 1, opacity = 1}: {x: number; y: number; scale?: number; opacity?: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 18,
      height: 18,
      borderRadius: 99,
      backgroundColor: color.red,
      boxShadow: '0 0 0 6px rgba(213,43,33,0.14)',
      scale,
      opacity,
    }}
  />
);

const Route = ({
  progress,
  d,
  dashed = false,
  opacity = 1,
}: {
  progress: number;
  d: string;
  dashed?: boolean;
  opacity?: number;
}) => (
  <svg
    viewBox="0 0 1080 1920"
    style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none'}}
  >
    <path
      d={d}
      fill="none"
      stroke={color.red}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={dashed ? '12 14' : 2600}
      strokeDashoffset={dashed ? 0 : 2600 * (1 - progress)}
    />
  </svg>
);

const ProgressDots = ({active}: {active: number}) => (
  <div style={{display: 'flex', gap: 9}}>
    {[0, 1, 2].map((dot) => (
      <div
        key={dot}
        style={{
          width: 8,
          height: 8,
          borderRadius: 99,
          backgroundColor: dot === active ? color.red : 'rgba(231,229,223,0.22)',
        }}
      />
    ))}
  </div>
);

const MatteOpening = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [10, 70, 119], [0.2, 1, 0.45], {...clamp, easing: easeInOut});

  return (
    <SceneShell index="01" label="origem">
      <div style={safe}>
        <Title frame={frame} support="Empresas não procuram mais uma tela. Procuram continuidade.">
          {'A oportunidade\nnão cabe em\numa conversa solta.'}
        </Title>
        <div style={{position: 'absolute', left: 0, right: 0, top: 610, height: 580}}>
          {[160, 270, 380, 490].map((size) => (
            <div
              key={size}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: size,
                height: size,
                border: '1px solid rgba(231,229,223,0.11)',
                borderRadius: 999,
                translate: '-50% -50%',
                scale: 0.85 + pulse * 0.15,
              }}
            />
          ))}
          <Signal x={interpolate(frame, [0, 110], [520, 618], clamp)} y={interpolate(frame, [0, 110], [290, 290], clamp)} scale={1.05} />
          <Panel
            style={{
              position: 'absolute',
              left: 128,
              right: 128,
              bottom: 30,
              padding: 28,
              ...entrance(frame, 48),
            }}
          >
            <Eyebrow red>um sinal</Eyebrow>
            <div style={{fontSize: 37, fontWeight: 700, letterSpacing: -1.2, marginTop: 13}}>interesse sem próximo passo</div>
          </Panel>
        </div>
      </div>
    </SceneShell>
  );
};

const MatteChaos = () => {
  const frame = useCurrentFrame();
  const cards = [
    {x: 0, y: 510, text: 'foto da cozinha', tag: 'imagem', delay: 10, rotate: '-5deg'},
    {x: 356, y: 432, text: '1,80 × 0,60', tag: 'medida', delay: 22, rotate: '3deg'},
    {x: 126, y: 710, text: 'quanto fica?', tag: 'mensagem', delay: 34, rotate: '4deg'},
    {x: 498, y: 770, text: 'retorno hoje', tag: 'urgente', delay: 46, rotate: '-4deg'},
    {x: 44, y: 982, text: 'granito preto', tag: 'material', delay: 58, rotate: '2deg'},
  ];
  const progress = interpolate(frame, [24, 170], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell index="02" label="dispersão">
      <Route progress={progress} dashed d="M 70 1180 C 320 1080 160 840 450 760 S 820 580 980 900" opacity={0.78} />
      <div style={safe}>
        <Title frame={frame} support="WhatsApp guarda tudo. Mas não organiza a operação.">
          {'Toda informação\nchega.\nNem toda avança.'}
        </Title>
        <div style={{position: 'absolute', left: 0, right: 0, top: 260, bottom: 0}}>
          {cards.map((card) => (
            <Panel
              key={card.text}
              style={{
                position: 'absolute',
                left: card.x,
                top: card.y - 260,
                width: 310,
                minHeight: 148,
                padding: 22,
                rotate: card.rotate,
                ...entrance(frame, card.delay),
              }}
            >
              <Eyebrow>{card.tag}</Eyebrow>
              <div style={{fontSize: 32, fontWeight: 690, letterSpacing: -0.8, marginTop: 20}}>{card.text}</div>
            </Panel>
          ))}
          <Signal x={interpolate(frame, [28, 168], [112, 786], {...clamp, easing: easeInOut})} y={interpolate(frame, [28, 168], [953, 525], {...clamp, easing: easeInOut})} />
        </div>
      </div>
    </SceneShell>
  );
};

const Measurement = () => (
  <div style={{position: 'absolute', left: 44, right: 44, top: 74, height: 240, border: '1px solid rgba(231,229,223,0.34)', borderRadius: 12}}>
    <div style={{position: 'absolute', left: 44, top: 34, color: color.bone, fontSize: 21}}>1,80 m</div>
    <div style={{position: 'absolute', bottom: 28, right: 34, color: color.bone, fontSize: 21}}>0,60 m</div>
    <div style={{position: 'absolute', left: 44, right: 44, top: 114, borderTop: '1px dashed rgba(231,229,223,0.42)'}} />
    <div style={{position: 'absolute', top: 40, bottom: 40, left: '52%', borderLeft: '1px dashed rgba(231,229,223,0.42)'}} />
  </div>
);

const MatteJourney = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [14, 274], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell index="03" label="jornada de compra">
      <Route progress={p} d="M 88 1240 C 300 1120 150 970 380 860 S 780 620 1000 770" />
      <div style={safe}>
        <Title frame={frame} support="Em marmorarias, o cliente decide depois de comparar cada detalhe." size={84}>
          {'Medida.\nReferência.\nMaterial. Prazo.'}
        </Title>
        <div style={{position: 'absolute', left: 0, right: 0, top: 480, height: 720}}>
          <Panel style={{position: 'absolute', left: 0, top: 30, width: 450, height: 424, overflow: 'hidden', ...entrance(frame, 18)}}>
            <Eyebrow>medição</Eyebrow>
            <Measurement />
          </Panel>
          <Panel style={{position: 'absolute', right: 0, top: 88, width: 390, height: 312, padding: 26, ...entrance(frame, 34)}}>
            <Eyebrow>materiais</Eyebrow>
            <div style={{display: 'flex', gap: 12, marginTop: 28}}>
              {[color.marble, '#343837', '#77766f'].map((swatch) => (
                <div key={swatch} style={{width: 94, height: 142, borderRadius: 10, background: `linear-gradient(130deg, ${swatch}, #141615)`}} />
              ))}
            </div>
          </Panel>
          <Panel style={{position: 'absolute', left: 126, right: 70, bottom: 0, padding: 28, ...entrance(frame, 52)}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <Eyebrow>referência do cliente</Eyebrow>
                <div style={{fontSize: 34, fontWeight: 680, marginTop: 13}}>cozinha / granito preto</div>
              </div>
              <div style={{color: color.red, fontSize: 30, fontWeight: 760}}>7 dias</div>
            </div>
          </Panel>
          <Signal x={interpolate(frame, [40, 250], [82, 750], {...clamp, easing: easeInOut})} y={interpolate(frame, [40, 250], [622, 312], {...clamp, easing: easeInOut})} />
        </div>
      </div>
    </SceneShell>
  );
};

const MatteLoss = () => {
  const frame = useCurrentFrame();
  const rupture = interpolate(frame, [45, 126], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell index="04" label="ruptura">
      <div style={safe}>
        <Title frame={frame} support="Sem contexto e acompanhamento, a venda se perde no meio.">
          {'O orçamento\nnão volta\nsozinho.'}
        </Title>
        <div style={{position: 'absolute', left: 0, right: 0, top: 540, height: 610}}>
          <Route progress={1 - rupture} d="M 86 820 C 280 770 348 820 530 740 S 760 630 980 710" />
          <Panel style={{position: 'absolute', left: 62, right: 62, top: 112, padding: 34, ...entrance(frame, 26)}}>
            <Eyebrow>orçamento</Eyebrow>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 28}}>
              <div style={{fontSize: 58, fontWeight: 720, letterSpacing: -2.7}}>R$ 5.780,00</div>
              <div style={{color: color.red, fontSize: 26, fontWeight: 720}}>expirado</div>
            </div>
          </Panel>
          <div style={{position: 'absolute', left: '50%', top: 360, color: color.red, fontSize: 88, fontWeight: 300, opacity: rupture, translate: '-50% 0'}}>×</div>
          <div
            style={{
              position: 'absolute',
              bottom: 26,
              left: 122,
              right: 122,
              textAlign: 'center',
              color: color.muted,
              fontSize: 28,
              fontWeight: 640,
              ...entrance(frame, 72),
            }}
          >
            SEM DONO. SEM RETORNO. SEM CONTINUIDADE.
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const MatteSearch = () => {
  const frame = useCurrentFrame();
  const route = interpolate(frame, [40, 240], [0, 1], {...clamp, easing: easeInOut});

  return (
    <SceneShell index="05" label="encontro">
      <Route progress={route} d="M 74 1480 C 240 1340 175 1110 404 1000 S 770 790 980 832" />
      <div style={safe}>
        <Title frame={frame} support="SEO local é ser encontrado por quem já está procurando.">
          {'Quem procura\nna cidade\nprecisa encontrar.'}
        </Title>
        <Panel style={{position: 'absolute', left: 0, right: 0, top: 510, padding: 28, ...entrance(frame, 26)}}>
          <Eyebrow>busca local</Eyebrow>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, padding: '20px 22px', border: `1px solid ${color.rule}`, borderRadius: 13}}>
            <div style={{fontSize: 34, color: color.muted}}>⌕</div>
            <div style={{fontSize: 29, fontWeight: 600}}>marmoraria em cachoeiro</div>
          </div>
          <div style={{height: 330, position: 'relative', marginTop: 22, overflow: 'hidden', borderRadius: 14, background: 'linear-gradient(135deg, #242927, #131718)'}}>
            {[120, 250, 380, 510, 640].map((left) => (
              <div key={left} style={{position: 'absolute', left, top: -70, width: 1, height: 500, backgroundColor: 'rgba(231,229,223,0.12)', rotate: '42deg'}} />
            ))}
            {[68, 148, 232].map((top) => (
              <div key={top} style={{position: 'absolute', left: -50, right: -50, top, borderTop: '1px solid rgba(231,229,223,0.09)', rotate: '-8deg'}} />
            ))}
            <div style={{position: 'absolute', left: interpolate(frame, [58, 208], [150, 530], {...clamp, easing: easeInOut}), top: 138, width: 30, height: 30, borderRadius: '50% 50% 50% 0', backgroundColor: color.red, rotate: '-45deg'}} />
          </div>
        </Panel>
        <Signal x={interpolate(frame, [40, 240], [90, 825], {...clamp, easing: easeInOut})} y={interpolate(frame, [40, 240], [1360, 760], {...clamp, easing: easeInOut})} />
      </div>
    </SceneShell>
  );
};

const MatteAutomation = () => {
  const frame = useCurrentFrame();
  const cards = [
    {heading: 'resposta inicial', text: 'Olá! Como podemos ajudar?', delay: 26},
    {heading: 'qualificação', text: 'serviço • medida • prazo', delay: 48},
    {heading: 'contexto mantido', text: 'histórico pronto para o especialista', delay: 70},
  ];

  return (
    <SceneShell index="06" label="qualificação">
      <div style={safe}>
        <Title frame={frame} support="Automação não substitui o atendimento. Evita que o lead fique parado." size={84}>
          {'A resposta\ncomeça rápido.\nO humano entra\ncom contexto.'}
        </Title>
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', flexDirection: 'column', gap: 20}}>
          {cards.map((card, index) => (
            <Panel key={card.heading} style={{padding: 26, minHeight: 148, ...entrance(frame, card.delay)}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Eyebrow red={index === 0}>{card.heading}</Eyebrow>
                {index === 2 ? <div style={{width: 28, height: 28, borderRadius: 99, border: `1px solid ${color.bone}`}} /> : <ProgressDots active={index} />}
              </div>
              <div style={{fontSize: index === 2 ? 28 : 35, fontWeight: 660, letterSpacing: -1, marginTop: 19}}>{card.text}</div>
            </Panel>
          ))}
        </div>
        <Route progress={interpolate(frame, [48, 180], [0, 1], {...clamp, easing: easeInOut})} d="M 90 1495 C 400 1400 620 1530 986 1428" />
        <Signal x={interpolate(frame, [48, 180], [100, 900], {...clamp, easing: easeInOut})} y={interpolate(frame, [48, 180], [1458, 1398], {...clamp, easing: easeInOut})} />
      </div>
    </SceneShell>
  );
};

const Metric = ({label, value, delay, tone = color.bone}: {label: string; value: string; delay: number; tone?: string}) => {
  const frame = useCurrentFrame();
  return (
    <Panel style={{padding: 22, ...entrance(frame, delay)}}>
      <Eyebrow>{label}</Eyebrow>
      <div style={{fontSize: 46, fontWeight: 720, letterSpacing: -2, color: tone, marginTop: 18}}>{value}</div>
    </Panel>
  );
};

const MatteCentral = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [68, 276], [0, 1], {...clamp, easing: easeInOut});
  const columns = ['Encontradas', 'Atendidas', 'Orçadas', 'Follow-up'];

  return (
    <SceneShell index="07" label="central de oportunidades">
      <div style={safe}>
        <Title frame={frame} support="Sistema interno é controle: cada oportunidade ganha etapa, dono e próxima ação." size={80}>
          {'Nada fica\nsem responsável.'}
        </Title>
        <Panel style={{position: 'absolute', top: 466, left: 0, right: 0, padding: 26, ...entrance(frame, 24)}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Eyebrow red>central de oportunidades</Eyebrow>
            <div style={{color: color.red, fontSize: 27, fontWeight: 720}}>32 ativas</div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 28}}>
            {columns.map((column, index) => (
              <div key={column} style={{minHeight: 362, padding: 13, borderRadius: 14, border: `1px solid ${color.rule}`, backgroundColor: 'rgba(255,255,255,0.02)'}}>
                <div style={{color: color.muted, fontSize: 17, fontWeight: 700, lineHeight: 1.05, letterSpacing: 0.3, textTransform: 'uppercase'}}>{column}</div>
                {[0, 1, 2].map((card) => (
                  <div key={card} style={{marginTop: 17, height: 76, borderRadius: 9, padding: 11, backgroundColor: color.panelSoft, border: `1px solid rgba(231,229,223,0.09)`, ...entrance(frame, 40 + index * 12 + card * 7)}}>
                    <div style={{height: 7, width: card === 1 ? '60%' : '78%', borderRadius: 99, backgroundColor: 'rgba(231,229,223,0.46)'}} />
                    <div style={{height: 6, width: '45%', borderRadius: 99, backgroundColor: 'rgba(231,229,223,0.18)', marginTop: 13}} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Panel>
        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14}}>
          <Metric label="origem" value="Busca" delay={56} tone={color.red} />
          <Metric label="etapa" value="Orçada" delay={68} />
          <Metric label="dono" value="Comercial" delay={80} />
          <Metric label="ação" value="Hoje" delay={92} tone={color.red} />
        </div>
        <Route progress={line} d="M 92 1574 C 250 1454 355 1620 508 1512 S 780 1440 978 1532" />
      </div>
    </SceneShell>
  );
};

const ChainStep = ({icon, label, index, frame}: {icon: string; label: string; index: number; frame: number}) => (
  <div style={{width: 190, textAlign: 'center', ...entrance(frame, 18 + index * 16)}}>
    <div style={{width: 74, height: 74, margin: '0 auto 22px', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${index === 3 ? color.red : color.rule}`, color: index === 3 ? color.red : color.bone, fontSize: 35}}>{icon}</div>
    <div style={{fontSize: 23, fontWeight: 700, lineHeight: 1.05, textTransform: 'uppercase'}}>{label}</div>
  </div>
);

const MatteChain = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [24, 178], [0, 1], {...clamp, easing: easeInOut});
  const steps = [
    {icon: '⌕', label: 'busca'},
    {icon: '◌', label: 'atendimento'},
    {icon: '▤', label: 'orçamento'},
    {icon: '↗', label: 'follow-up'},
  ];

  return (
    <SceneShell index="08" label="continuidade">
      <div style={safe}>
        <Title frame={frame} align="center" support="A Techmarque cria tecnologia para o caminho inteiro." size={86}>
          {'Do interesse\na uma operação\nmais clara.'}
        </Title>
        <div style={{position: 'absolute', left: -20, right: -20, top: 665, height: 410}}>
          <Route progress={p} d="M 138 985 L 938 985" />
          <div style={{position: 'absolute', left: 0, right: 0, top: 235, display: 'flex', justifyContent: 'space-between'}}>
            {steps.map((step, index) => <ChainStep key={step.label} {...step} index={index} frame={frame} />)}
          </div>
          <Signal x={interpolate(frame, [24, 178], [122, 920], {...clamp, easing: easeInOut})} y={interpolate(frame, [24, 178], [976, 976], clamp)} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 80, textAlign: 'center', ...entrance(frame, 96)}}>
          <Eyebrow red>resultado</Eyebrow>
          <div style={{fontSize: 41, fontWeight: 700, letterSpacing: -1.6, marginTop: 18}}>MENOS PERDA. MAIS CONTINUIDADE.</div>
        </div>
      </div>
    </SceneShell>
  );
};

const MatteCTA = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [10, 110], [0, 1], {...clamp, easing: easeOut});

  return (
    <AbsoluteFill style={{backgroundColor: color.red, color: color.bone, overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif'}}>
      <AbsoluteFill style={{opacity: 0.42, background: 'radial-gradient(circle at 70% 24%, rgba(0,0,0,0.24), transparent 32%), repeating-linear-gradient(126deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 14px)'}} />
      {[210, 350, 490].map((size) => (
        <div key={size} style={{position: 'absolute', left: '50%', bottom: -size / 2 + 60, width: size, height: size, border: '1px solid rgba(231,229,223,0.19)', borderRadius: 999, translate: '-50% 0', scale: 0.92 + reveal * 0.08}} />
      ))}
      <div style={safe}>
        <div style={{...entrance(frame, 6), paddingTop: 110}}>
          <Img src={staticFile('logos/techmarque-symbol-red.png')} style={{width: 170, height: 170, objectFit: 'contain', filter: 'brightness(0) invert(1)'}} />
          <div style={{marginTop: 70, fontSize: 88, fontWeight: 780, lineHeight: 0.92, letterSpacing: -4.5, whiteSpace: 'pre-line'}}>{'Diagnóstico\nantes da\nproposta.'}</div>
          <div style={{marginTop: 34, color: 'rgba(231,229,223,0.84)', fontSize: 34, lineHeight: 1.18, maxWidth: 620}}>Se as oportunidades se perdem no caminho, comece pelo diagnóstico no nosso site.</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 110, ...entrance(frame, 84)}}>
          <div style={{border: '1px solid rgba(231,229,223,0.7)', borderRadius: 16, padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 24, fontWeight: 760, letterSpacing: 1.25, textTransform: 'uppercase'}}>Techmarque</div>
            <div style={{fontSize: 21, fontWeight: 700}}>Acesse o perfil →</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const sceneEntries: SceneEntry[] = [
  {id: '01', title: 'Origem', duration: 120, component: MatteOpening},
  {id: '02', title: 'Dispersão', duration: 210, component: MatteChaos},
  {id: '03', title: 'Jornada de compra', duration: 300, component: MatteJourney},
  {id: '04', title: 'Ruptura', duration: 150, component: MatteLoss},
  {id: '05', title: 'Encontro', duration: 270, component: MatteSearch},
  {id: '06', title: 'Qualificação', duration: 210, component: MatteAutomation},
  {id: '07', title: 'Central de oportunidades', duration: 330, component: MatteCentral},
  {id: '08', title: 'Continuidade', duration: 210, component: MatteChain},
  {id: '09', title: 'CTA', duration: 180, component: MatteCTA},
];

const sceneStarts = sceneEntries.reduce<number[]>((starts) => {
  const previous = starts[starts.length - 1] ?? 0;
  const previousDuration = starts.length === 0 ? 0 : sceneEntries[starts.length - 1].duration;
  starts.push(previous + previousDuration);
  return starts;
}, []);

export const TechmarqueMatteOpportunity = ({city, showSafeArea = false}: FilmProps) => {
  void city;

  return (
    <AbsoluteFill style={{backgroundColor: color.black}}>
      {sceneEntries.map((scene, index) => {
        const Scene = scene.component;
        return (
          <Sequence key={scene.id} from={sceneStarts[index]} durationInFrames={scene.duration}>
            <Scene />
          </Sequence>
        );
      })}
      {showSafeArea ? (
        <div style={{...safe, position: 'absolute', border: `1px dashed ${color.red}`, opacity: 0.3, pointerEvents: 'none'}} />
      ) : null}
    </AbsoluteFill>
  );
};

export const MatteOpeningPreview = MatteOpening;
export const MatteChaosPreview = MatteChaos;
export const MatteJourneyPreview = MatteJourney;
export const MatteLossPreview = MatteLoss;
export const MatteSearchPreview = MatteSearch;
export const MatteAutomationPreview = MatteAutomation;
export const MatteCentralPreview = MatteCentral;
export const MatteChainPreview = MatteChain;
export const MatteCTAPreview = MatteCTA;

export const MATTE_SCENES = sceneEntries;
