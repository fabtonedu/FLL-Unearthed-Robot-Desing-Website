import React, {CSSProperties} from 'react';
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  Boxes,
  CircuitBoard,
  Code2,
  Cpu,
  Gauge,
  Github,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';

type Variant = 'long' | 'short';

type SceneDurations = {
  intro: number;
  overview: number;
  specs: number;
  programs: number;
  strategy: number;
  montage: number;
  outro: number;
};

type VariantConfig = {
  label: string;
  subtitle: string;
  durations: SceneDurations;
};

type Metric = {
  label: string;
  value: string;
};

type FocusSpot = {
  x: number;
  y: number;
  label: string;
  delay: number;
};

const palette = {
  bg: '#040507',
  panel: 'rgba(17, 22, 30, 0.86)',
  panelSoft: 'rgba(16, 17, 24, 0.76)',
  text: '#f5f7ff',
  muted: '#aab3c6',
  blue: '#57a7ff',
  cyan: '#7ce7ff',
  green: '#4add99',
  stroke: 'rgba(255,255,255,0.14)',
};

const variantConfigs: Record<Variant, VariantConfig> = {
  long: {
    label: 'Full Showreel',
    subtitle: 'Robot design, technikai specifikaciok es programlogika cinematic UI narrativaban.',
    durations: {
      intro: 360,
      overview: 1680,
      specs: 1380,
      programs: 1980,
      strategy: 1800,
      montage: 1200,
      outro: 600,
    },
  },
  short: {
    label: 'Short Cut',
    subtitle: 'Koncentralt, gyors tech reklam verzio kulcspillanatokkal.',
    durations: {
      intro: 180,
      overview: 420,
      specs: 360,
      programs: 600,
      strategy: 540,
      montage: 420,
      outro: 180,
    },
  },
};

const sumDurations = (durations: SceneDurations) =>
  durations.intro +
  durations.overview +
  durations.specs +
  durations.programs +
  durations.strategy +
  durations.montage +
  durations.outro;

const baseLayout: CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '116px 128px 86px 128px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontFamily: 'Avenir Next, Segoe UI, system-ui, sans-serif',
  color: palette.text,
};

const panelStyle: CSSProperties = {
  borderRadius: 36,
  border: `1px solid ${palette.stroke}`,
  background: `linear-gradient(140deg, ${palette.panel} 0%, ${palette.panelSoft} 100%)`,
  boxShadow: '0 38px 120px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(12px)',
};

const sectionTitleStyle: CSSProperties = {
  margin: '16px 0 14px 0',
  fontSize: 104,
  lineHeight: 0.94,
  letterSpacing: -2,
  maxWidth: 2500,
};

const SceneBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 16%, rgba(87,167,255,0.2), transparent 42%), radial-gradient(circle at 82% 82%, rgba(74,221,153,0.15), transparent 42%), #040507',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 1260,
          height: 1260,
          borderRadius: '50%',
          left: -220 + Math.sin(frame / 64) * 110,
          top: -280 + Math.cos(frame / 70) * 80,
          background: 'radial-gradient(circle, rgba(87,167,255,0.28) 0%, rgba(87,167,255,0.06) 46%, transparent 73%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          right: -160 + Math.cos(frame / 58) * 90,
          bottom: -240 + Math.sin(frame / 66) * 70,
          background: 'radial-gradient(circle, rgba(124,231,255,0.2) 0%, rgba(124,231,255,0.05) 46%, transparent 74%)',
          filter: 'blur(34px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 2px, transparent 2px, transparent 12px)',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

type SceneShellProps = {
  kicker: string;
  title: string;
  subtitle: string;
  sceneDuration: number;
  metrics?: Metric[];
  children: React.ReactNode;
};

const SceneShell: React.FC<SceneShellProps> = ({
  kicker,
  title,
  subtitle,
  sceneDuration,
  metrics,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 120, mass: 0.9},
  });

  const exit = interpolate(frame, [sceneDuration - 44, sceneDuration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const topLift = interpolate(1 - enter, [0, 1], [0, 44]);

  return (
    <AbsoluteFill>
      <SceneBackdrop />
      <div
        style={{
          ...baseLayout,
          opacity: enter * exit,
          transform: `translateY(${topLift}px)`,
        }}
      >
        <header>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 25,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              color: '#cce7ff',
              border: '1px solid rgba(87,167,255,0.58)',
              background: 'rgba(87,167,255,0.18)',
              borderRadius: 999,
              padding: '11px 20px',
            }}
          >
            {kicker}
          </div>
          <h1 style={sectionTitleStyle}>{title}</h1>
          <p
            style={{
              margin: 0,
              maxWidth: 2500,
              fontSize: 46,
              lineHeight: 1.2,
              color: palette.muted,
            }}
          >
            {subtitle}
          </p>
        </header>

        <div style={{display: 'grid', gap: 26}}>{children}</div>

        {metrics ? (
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`, gap: 16}}>
            {metrics.map((metric, idx) => (
              <AnimatedCard key={metric.label} delay={idx * 6} sceneDuration={sceneDuration}>
                <div style={{...panelStyle, padding: '18px 24px'}}>
                  <p style={{margin: 0, fontSize: 22, color: palette.muted}}>{metric.label}</p>
                  <p style={{margin: '6px 0 0 0', fontSize: 46, fontWeight: 800, letterSpacing: -0.8}}>{metric.value}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

type AnimatedCardProps = {
  delay?: number;
  sceneDuration: number;
  children: React.ReactNode;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({delay = 0, sceneDuration, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const localFrame = frame - delay;
  const inSpring = spring({
    frame: localFrame,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.8},
  });
  const outFade = interpolate(frame, [sceneDuration - 30 - delay, sceneDuration - 4], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shift = interpolate(1 - inSpring, [0, 1], [0, 46]);
  return <div style={{opacity: inSpring * outFade, transform: `translateY(${shift}px)`}}>{children}</div>;
};

type BadgeItemProps = {
  icon: React.ComponentType<{size?: number; strokeWidth?: number}>;
  title: string;
  text: string;
  delay?: number;
  sceneDuration: number;
};

const BadgeItem: React.FC<BadgeItemProps> = ({icon: Icon, title, text, delay = 0, sceneDuration}) => {
  return (
    <AnimatedCard delay={delay} sceneDuration={sceneDuration}>
      <div
        style={{
          ...panelStyle,
          padding: '22px 24px',
          display: 'grid',
          gridTemplateColumns: '56px 1fr',
          gap: 16,
          alignItems: 'start',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            border: '1px solid rgba(124,231,255,0.4)',
            background: 'rgba(124,231,255,0.12)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon size={30} strokeWidth={2.1} />
        </div>
        <div>
          <p style={{margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: -0.4}}>{title}</p>
          <p style={{margin: '6px 0 0 0', fontSize: 23, lineHeight: 1.28, color: palette.muted}}>{text}</p>
        </div>
      </div>
    </AnimatedCard>
  );
};

type CinematicPanelProps = {
  src: string;
  sceneDuration: number;
  startFrom?: number;
  zoomFrom?: number;
  zoomTo?: number;
  panXFrom?: number;
  panXTo?: number;
  panYFrom?: number;
  panYTo?: number;
  focusSpots?: FocusSpot[];
};

const CinematicPanel: React.FC<CinematicPanelProps> = ({
  src,
  sceneDuration,
  startFrom = 0,
  zoomFrom = 1.02,
  zoomTo = 1.12,
  panXFrom = -20,
  panXTo = 18,
  panYFrom = 0,
  panYTo = -16,
  focusSpots,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, sceneDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const zoom = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const x = interpolate(t, [0, 1], [panXFrom, panXTo]);
  const y = interpolate(t, [0, 1], [panYFrom, panYTo]);

  return (
    <div
      style={{
        ...panelStyle,
        height: 1040,
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.14)',
          background: '#0b0e13',
        }}
      >
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${zoom}) translate(${x}px, ${y}px)`,
            transformOrigin: 'center center',
            filter: 'saturate(1.08) contrast(1.06)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 70% 20%, rgba(124,231,255,0.12), transparent 36%), radial-gradient(circle at 30% 90%, rgba(87,167,255,0.14), transparent 40%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 -180px 220px rgba(3,4,8,0.72), inset 0 120px 170px rgba(3,4,8,0.3)',
          }}
        />

        {focusSpots?.map((spot) => {
          const local = frame - spot.delay;
          const ringIn = spring({
            frame: local,
            fps: 60,
            config: {damping: 14, stiffness: 170},
          });
          const ringOpacity = interpolate(frame, [spot.delay, spot.delay + 24, sceneDuration - 32], [0, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={`${spot.label}-${spot.x}-${spot.y}`}
              style={{
                position: 'absolute',
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: ringOpacity,
              }}
            >
              <div
                style={{
                  width: 118,
                  height: 118,
                  borderRadius: '50%',
                  border: '2px solid rgba(124,231,255,0.85)',
                  boxShadow: '0 0 0 14px rgba(124,231,255,0.18), 0 0 42px rgba(124,231,255,0.45)',
                  transform: `scale(${0.8 + ringIn * 0.24})`,
                }}
              />
              <div
                style={{
                  marginTop: 14,
                  padding: '8px 12px',
                  borderRadius: 12,
                  border: '1px solid rgba(124,231,255,0.6)',
                  background: 'rgba(7,11,17,0.8)',
                  fontSize: 20,
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                  letterSpacing: 0.2,
                  color: '#dbf4ff',
                  textAlign: 'center',
                }}
              >
                {spot.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type IntroSceneProps = {
  variant: Variant;
  duration: number;
};

const IntroScene: React.FC<IntroSceneProps> = ({variant, duration}) => {
  const frame = useCurrentFrame();
  const config = variantConfigs[variant];
  const src = staticFile('showreel/full-scroll.webm');

  const fadeVideo = interpolate(frame, [0, 52], [0.3, 0.94], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const reveal = interpolate(frame, [0, duration * 0.7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{background: palette.bg}}>
      <OffthreadVideo
        src={src}
        startFrom={20}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: fadeVideo,
          filter: 'blur(2px) saturate(1.08)',
          transform: `scale(${1.04 + reveal * 0.05})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(1,2,6,0.45) 0%, rgba(3,4,9,0.85) 100%)',
        }}
      />

      <div
        style={{
          ...baseLayout,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p style={{margin: 0, fontSize: 34, color: '#b5ddff', letterSpacing: 2.4, fontWeight: 700}}>TEAM FABTON</p>
        <h1 style={{margin: '16px 0 0 0', fontSize: 186, letterSpacing: -3.4, lineHeight: 0.9}}>ROBOT DESIGN</h1>
        <h1 style={{margin: 0, fontSize: 166, letterSpacing: -3.1, lineHeight: 0.9}}>SHOWREEL</h1>
        <p style={{margin: '26px 0 0 0', fontSize: 40, color: '#d7e4f4', maxWidth: 2600, lineHeight: 1.23}}>{config.subtitle}</p>
      </div>
    </AbsoluteFill>
  );
};

type OverviewSceneProps = {
  duration: number;
  variant: Variant;
};

const OverviewScene: React.FC<OverviewSceneProps> = ({duration, variant}) => {
  const src = staticFile('showreel/full-scroll.webm');
  const mainStart = variant === 'long' ? 220 : 120;

  return (
    <SceneShell
      kicker="Teljes Weboldal"
      title="Minden szekcio egy cinematic folyamattal bemutatva"
      subtitle="Scroll dramaturgia, bejovo kartyaanimaciok, fokuszkiemeles es camera drift egyetlen tiszta vizualis nyelven."
      sceneDuration={duration}
      metrics={[
        {label: 'Felveteli stilus', value: 'Valos UI Capture'},
        {label: 'Megjelenes', value: 'Minimal + Reklam'},
        {label: 'Nyelv', value: 'Magyar Tartalom'},
      ]}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1.38fr 0.95fr', gap: 24, alignItems: 'stretch'}}>
        <AnimatedCard delay={0} sceneDuration={duration}>
          <CinematicPanel
            src={src}
            sceneDuration={duration}
            startFrom={mainStart}
            zoomFrom={1.03}
            zoomTo={1.16}
            panXFrom={-46}
            panXTo={28}
            panYFrom={-8}
            panYTo={-22}
            focusSpots={[
              {x: 26, y: 27, label: 'Hero', delay: 26},
              {x: 55, y: 49, label: 'Tech Cards', delay: 100},
              {x: 70, y: 74, label: 'Program + PID', delay: 170},
            ]}
          />
        </AnimatedCard>

        <div style={{display: 'grid', gap: 16}}>
          <BadgeItem
            icon={Boxes}
            title="Robot Design"
            text="Lathatoan kulonulnek a mechanikai blokkok, modulok es kuldetesenkenti elemek."
            delay={8}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Cpu}
            title="Technikai Specifikaciok"
            text="Hub, motor, szenzor, quick-lock rendszer es valos teljesitmenymutatok."
            delay={15}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Code2}
            title="Programlogika"
            text="HSV trigger, run dispatch, kalibracio, PID korrekcio es tesztmatrix UI-n keresztul."
            delay={22}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Sparkles}
            title="Cinematic Kiemelek"
            text="Depth blur, fokuszringe, oldalszeli vignetta es lebego highlight panelek."
            delay={29}
            sceneDuration={duration}
          />
        </div>
      </div>
    </SceneShell>
  );
};

type SpecsSceneProps = {
  duration: number;
  variant: Variant;
};

const SpecsScene: React.FC<SpecsSceneProps> = ({duration, variant}) => {
  const src = staticFile('showreel/robot-specs.webm');

  return (
    <SceneShell
      kicker="Robot + Specs"
      title="Technikai alapok, gyors attekintessel"
      subtitle="A robot felépítése, komponensei es a fejlesztesi logika ugyanabban az elegans, letisztult ritmusban."
      sceneDuration={duration}
      metrics={[
        {label: 'Quick-Lock csere', value: '2 mp'},
        {label: 'Hajtás', value: '2x + 2x Medium Motor'},
        {label: 'Szenzor stack', value: 'Gyro + Color + Force'},
      ]}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'stretch'}}>
        <AnimatedCard delay={0} sceneDuration={duration}>
          <CinematicPanel
            src={src}
            sceneDuration={duration}
            startFrom={variant === 'long' ? 90 : 40}
            zoomFrom={1.01}
            zoomTo={1.14}
            panXFrom={-30}
            panXTo={30}
            panYFrom={8}
            panYTo={-14}
            focusSpots={[
              {x: 28, y: 42, label: 'Spec Kartya', delay: 26},
              {x: 61, y: 37, label: 'Quick-Lock', delay: 74},
              {x: 72, y: 66, label: 'Szenzorok', delay: 120},
            ]}
          />
        </AnimatedCard>

        <div style={{display: 'grid', gap: 16}}>
          <BadgeItem
            icon={CircuitBoard}
            title="Mernoki Stabilitas"
            text="Alacsony, stabil vaz es gyors kiegészítőcsere versenykornyezetre hangolva."
            delay={8}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Workflow}
            title="Parhuzamos Fejlesztes"
            text="Dummy robot + fobb robot koncepcio: program es mechanika egyszerre fejlodik."
            delay={14}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={ShieldCheck}
            title="Tesztelesi Fegyelem"
            text="Szekcionkent visszamerheto fejlesztes, finomhangolas es reprodukalhato eredmenyek."
            delay={20}
            sceneDuration={duration}
          />
        </div>
      </div>
    </SceneShell>
  );
};

type ProgramsSceneProps = {
  duration: number;
  variant: Variant;
};

const ProgramsScene: React.FC<ProgramsSceneProps> = ({duration, variant}) => {
  const src = staticFile('showreel/code-programs.webm');

  return (
    <SceneShell
      kicker="Programok"
      title="HSV + Programvaltas + PID interakcio"
      subtitle="Kodablak nyitas, slider animaciok es run logika valos UI esemenyekkel rogzitve."
      sceneDuration={duration}
      metrics={[
        {label: 'Kodforras nezet', value: 'Modal + Preview'},
        {label: 'Color Trigger', value: 'HSV tartomany'},
        {label: 'Kontroll', value: 'PID mini szimulacio'},
      ]}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1.35fr 0.9fr', gap: 24, alignItems: 'stretch'}}>
        <AnimatedCard delay={0} sceneDuration={duration}>
          <CinematicPanel
            src={src}
            sceneDuration={duration}
            startFrom={variant === 'long' ? 70 : 30}
            zoomFrom={1.04}
            zoomTo={1.18}
            panXFrom={-48}
            panXTo={20}
            panYFrom={0}
            panYTo={-28}
            focusSpots={[
              {x: 39, y: 31, label: 'Kod Kartya', delay: 26},
              {x: 66, y: 56, label: 'HSV Slider', delay: 90},
              {x: 61, y: 76, label: 'PID Panel', delay: 156},
            ]}
          />
        </AnimatedCard>

        <div style={{display: 'grid', gap: 16}}>
          <BadgeItem
            icon={Code2}
            title="Programok lathatoan"
            text="Kiemelt kodreszletek es teljes forrasmodalok: transzparens, oktathato strukturaval."
            delay={8}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Target}
            title="Szinfelismeres"
            text="Nyomas + HSV olvasas + trigger illesztes + automatikus futasvaltas egy folyamatban."
            delay={16}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Gauge}
            title="PID erthetoen"
            text="A csuszkakon azonnali vizualis valasz: elteres, korrekcio, kovetkezo allapot."
            delay={24}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={PlayCircle}
            title="Versenyre kesz"
            text="Interakcios flow kifejezetten stresszhelyzetben is gyors, egyertelmu kezelhetosegre tervezve."
            delay={31}
            sceneDuration={duration}
          />
        </div>
      </div>
    </SceneShell>
  );
};

type StrategySceneProps = {
  duration: number;
  variant: Variant;
};

const StrategyScene: React.FC<StrategySceneProps> = ({duration, variant}) => {
  const src = staticFile('showreel/strategy-dashboard.webm');

  return (
    <SceneShell
      kicker="Strategia"
      title="Futamok, route es 20-as tesztmatrix"
      subtitle="Minden futamra kulon dashboard, ido- es pontfokusz, vizualis visszajelzessel."
      sceneDuration={duration}
      metrics={[
        {label: 'Futamok', value: '10 konfiguracio'},
        {label: 'Tesztmod', value: '20 futas / run'},
        {label: 'UI cel', value: 'Gyors dontes'},
      ]}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1.28fr 0.92fr', gap: 24, alignItems: 'stretch'}}>
        <AnimatedCard delay={0} sceneDuration={duration}>
          <CinematicPanel
            src={src}
            sceneDuration={duration}
            startFrom={variant === 'long' ? 80 : 35}
            zoomFrom={1.03}
            zoomTo={1.16}
            panXFrom={-32}
            panXTo={26}
            panYFrom={-2}
            panYTo={-20}
            focusSpots={[
              {x: 20, y: 42, label: 'Futam Valaszto', delay: 24},
              {x: 53, y: 35, label: 'Route Terv', delay: 84},
              {x: 73, y: 74, label: 'Teszt Matrix', delay: 140},
            ]}
          />
        </AnimatedCard>

        <div style={{display: 'grid', gap: 16}}>
          <BadgeItem
            icon={Target}
            title="Pont es ido balansz"
            text="A dashboard egyszerre kezeli a kuldetespontokat, futamidot es atszerelesi idot."
            delay={7}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={Workflow}
            title="Futam dramaturgia"
            text="A kartyavaltas a videoban is ugyanazt a versenyritmust koveti, mint valos hasznalatkor."
            delay={14}
            sceneDuration={duration}
          />
          <BadgeItem
            icon={ShieldCheck}
            title="Megbizhatosag"
            text="A 20-as matrix konnyen olvashatoan emeli ki a stabilitast es a hibaratakat."
            delay={21}
            sceneDuration={duration}
          />
        </div>
      </div>
    </SceneShell>
  );
};

type MontageSceneProps = {
  duration: number;
  variant: Variant;
};

const MontageScene: React.FC<MontageSceneProps> = ({duration, variant}) => {
  const mission = staticFile('showreel/mission-flow.webm');
  const full = staticFile('showreel/full-scroll.webm');
  const code = staticFile('showreel/code-programs.webm');
  const strategy = staticFile('showreel/strategy-dashboard.webm');

  const mainStart = variant === 'long' ? 120 : 42;

  return (
    <SceneShell
      kicker="Montage"
      title="Nyilt forraskod, fejlodes es teljes csapatnarrativa"
      subtitle="A vegso blokk osszefuzi a tartalmi pillereket: robot, kod, strategia es megosztas."
      sceneDuration={duration}
      metrics={[
        {label: 'Open Source', value: 'GitHub Publikus'},
        {label: 'Iteracio', value: 'V1 -> V2'},
        {label: 'Kimenet', value: '4K 60 FPS'},
      ]}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20}}>
        <AnimatedCard delay={0} sceneDuration={duration}>
          <CinematicPanel
            src={mission}
            sceneDuration={duration}
            startFrom={mainStart}
            zoomFrom={1.02}
            zoomTo={1.12}
            panXFrom={-22}
            panXTo={24}
            panYFrom={-8}
            panYTo={-14}
            focusSpots={[
              {x: 34, y: 33, label: 'Iteracio', delay: 26},
              {x: 64, y: 56, label: 'Open Source', delay: 96},
            ]}
          />
        </AnimatedCard>

        <div style={{display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 16}}>
          <AnimatedCard delay={10} sceneDuration={duration}>
            <div style={{...panelStyle, padding: 12, height: 330}}>
              <div style={{borderRadius: 18, overflow: 'hidden', height: '100%', border: `1px solid ${palette.stroke}`}}>
                <OffthreadVideo
                  src={full}
                  startFrom={variant === 'long' ? 760 : 220}
                  muted
                  style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1) translateX(-18px)'}}
                />
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={16} sceneDuration={duration}>
            <div style={{...panelStyle, padding: 12, height: 330}}>
              <div style={{borderRadius: 18, overflow: 'hidden', height: '100%', border: `1px solid ${palette.stroke}`}}>
                <OffthreadVideo
                  src={code}
                  startFrom={variant === 'long' ? 420 : 170}
                  muted
                  style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.12) translateX(16px)'}}
                />
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={22} sceneDuration={duration}>
            <div style={{...panelStyle, padding: 12, height: 330}}>
              <div style={{borderRadius: 18, overflow: 'hidden', height: '100%', border: `1px solid ${palette.stroke}`}}>
                <OffthreadVideo
                  src={strategy}
                  startFrom={variant === 'long' ? 360 : 120}
                  muted
                  style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1) translateX(-8px)'}}
                />
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </SceneShell>
  );
};

type OutroSceneProps = {
  duration: number;
};

const OutroScene: React.FC<OutroSceneProps> = ({duration}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, duration * 0.7], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell
      kicker="Vegso kep"
      title="FABTON"
      subtitle="Robot design. Technikai pontossag. Programozasi fegyelem."
      sceneDuration={duration}
    >
      <div style={{display: 'grid', placeItems: 'center', minHeight: 980}}>
        <div
          style={{
            ...panelStyle,
            minWidth: 1960,
            padding: '56px 72px',
            textAlign: 'center',
            boxShadow: `0 40px 110px rgba(33,147,255,${0.24 * glow})`,
            border: '1px solid rgba(124,231,255,0.4)',
          }}
        >
          <p style={{margin: 0, fontSize: 34, color: palette.muted, letterSpacing: 1.2}}>FLL UNEARTHED ROBOT DESIGN WEBSITE</p>
          <p style={{margin: '14px 0 0 0', fontSize: 86, fontWeight: 800, letterSpacing: -1.8}}>SHOWREEL 2026</p>
          <p style={{margin: '12px 0 0 0', fontSize: 30, color: '#c8d4e6'}}>Koszonjuk a figyelmet.</p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        <AnimatedCard sceneDuration={duration} delay={0}>
          <div style={{...panelStyle, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12}}>
            <Github size={32} />
            <p style={{margin: 0, fontSize: 28, color: palette.muted}}>fabtonedu/BARCA---FLL-Unearthed</p>
          </div>
        </AnimatedCard>
        <AnimatedCard sceneDuration={duration} delay={6}>
          <div style={{...panelStyle, padding: '16px 24px'}}>
            <p style={{margin: 0, fontSize: 28, color: palette.muted}}>Export: 3840x2160 • 60 FPS • H.264</p>
          </div>
        </AnimatedCard>
      </div>
    </SceneShell>
  );
};

const ProgressStrip: React.FC<{totalFrames: number}> = ({totalFrames}) => {
  const frame = useCurrentFrame();
  const pct = Math.max(0, Math.min(1, frame / Math.max(1, totalFrames - 1)));

  return (
    <AbsoluteFill pointerEvents="none">
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 26,
          right: 26,
          height: 8,
          borderRadius: 999,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.14)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            width: `${pct * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #57a7ff 0%, #7ce7ff 52%, #4add99 100%)',
            boxShadow: '0 0 28px rgba(87,167,255,0.55)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export type SiteShowcaseVideoProps = {
  variant: Variant;
};

export const SiteShowcaseVideo: React.FC<SiteShowcaseVideoProps> = ({variant}) => {
  const config = variantConfigs[variant];
  const durations = config.durations;
  const totalFrames = sumDurations(durations);

  let at = 0;
  const introAt = at;
  at += durations.intro;
  const overviewAt = at;
  at += durations.overview;
  const specsAt = at;
  at += durations.specs;
  const programsAt = at;
  at += durations.programs;
  const strategyAt = at;
  at += durations.strategy;
  const montageAt = at;
  at += durations.montage;
  const outroAt = at;

  return (
    <AbsoluteFill style={{background: palette.bg}}>
      <Sequence from={introAt} durationInFrames={durations.intro}>
        <IntroScene variant={variant} duration={durations.intro} />
      </Sequence>

      <Sequence from={overviewAt} durationInFrames={durations.overview}>
        <OverviewScene duration={durations.overview} variant={variant} />
      </Sequence>

      <Sequence from={specsAt} durationInFrames={durations.specs}>
        <SpecsScene duration={durations.specs} variant={variant} />
      </Sequence>

      <Sequence from={programsAt} durationInFrames={durations.programs}>
        <ProgramsScene duration={durations.programs} variant={variant} />
      </Sequence>

      <Sequence from={strategyAt} durationInFrames={durations.strategy}>
        <StrategyScene duration={durations.strategy} variant={variant} />
      </Sequence>

      <Sequence from={montageAt} durationInFrames={durations.montage}>
        <MontageScene duration={durations.montage} variant={variant} />
      </Sequence>

      <Sequence from={outroAt} durationInFrames={durations.outro}>
        <OutroScene duration={durations.outro} />
      </Sequence>

      <ProgressStrip totalFrames={totalFrames} />
    </AbsoluteFill>
  );
};
