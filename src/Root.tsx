import {Composition} from 'remotion';
import {TechmarqueMotionDemo} from './compositions/TechmarqueMotionDemo';
import {
  FOUNDATION_PILOT_DURATION,
  FOUNDATION_PILOT_FPS,
  FOUNDATION_PILOT_HEIGHT,
  FOUNDATION_PILOT_WIDTH,
  TechmarqueFoundationPilot,
} from './compositions/TechmarqueFoundationPilot';
import {
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  TechmarqueOpportunityPath,
  WIDTH,
} from './compositions/TechmarqueOpportunityPath';
import {
  MATTE_DURATION,
  MATTE_FPS,
  MATTE_HEIGHT,
  MATTE_SCENES,
  MATTE_WIDTH,
  MatteAutomationPreview,
  MatteCTAPreview,
  MatteCentralPreview,
  MatteChainPreview,
  MatteChaosPreview,
  MatteJourneyPreview,
  MatteLossPreview,
  MatteOpeningPreview,
  MatteSearchPreview,
  TechmarqueMatteOpportunity,
} from './compositions/TechmarqueMatteOpportunity';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TechmarqueOpportunityPath"
        component={TechmarqueOpportunityPath}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          city: 'Cachoeiro',
          logoSrc: undefined,
          showSafeArea: false,
        }}
      />
      <Composition
        id="TechmarqueMotionDemo"
        component={TechmarqueMotionDemo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TechmarqueFoundationPilot"
        component={TechmarqueFoundationPilot}
        durationInFrames={FOUNDATION_PILOT_DURATION}
        fps={FOUNDATION_PILOT_FPS}
        width={FOUNDATION_PILOT_WIDTH}
        height={FOUNDATION_PILOT_HEIGHT}
      />
      <Composition
        id="TechmarqueMatteOpportunity"
        component={TechmarqueMatteOpportunity}
        durationInFrames={MATTE_DURATION}
        fps={MATTE_FPS}
        width={MATTE_WIDTH}
        height={MATTE_HEIGHT}
        defaultProps={{city: 'Cachoeiro', showSafeArea: false}}
      />
      <Composition id="TechmarqueMatte-01-Origem" component={MatteOpeningPreview} durationInFrames={MATTE_SCENES[0].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-02-Dispersao" component={MatteChaosPreview} durationInFrames={MATTE_SCENES[1].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-03-Jornada" component={MatteJourneyPreview} durationInFrames={MATTE_SCENES[2].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-04-Ruptura" component={MatteLossPreview} durationInFrames={MATTE_SCENES[3].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-05-Encontro" component={MatteSearchPreview} durationInFrames={MATTE_SCENES[4].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-06-Qualificacao" component={MatteAutomationPreview} durationInFrames={MATTE_SCENES[5].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-07-Central" component={MatteCentralPreview} durationInFrames={MATTE_SCENES[6].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-08-Continuidade" component={MatteChainPreview} durationInFrames={MATTE_SCENES[7].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
      <Composition id="TechmarqueMatte-09-CTA" component={MatteCTAPreview} durationInFrames={MATTE_SCENES[8].duration} fps={MATTE_FPS} width={MATTE_WIDTH} height={MATTE_HEIGHT} />
    </>
  );
};
