import React from 'react';
import {Composition} from 'remotion';
import {SiteShowcaseVideo} from './SiteShowcaseVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FabtonSiteShowcaseLong"
        component={SiteShowcaseVideo}
        defaultProps={{variant: 'long'}}
        durationInFrames={9000}
        fps={60}
        width={3840}
        height={2160}
      />

      <Composition
        id="FabtonSiteShowcaseShort"
        component={SiteShowcaseVideo}
        defaultProps={{variant: 'short'}}
        durationInFrames={2700}
        fps={60}
        width={3840}
        height={2160}
      />
    </>
  );
};
