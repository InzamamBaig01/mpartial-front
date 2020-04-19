import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import BackgroundVideo from 'react-background-video-player';
import { css } from '@emotion/core';
import videofile from "../../../../assets/background.mp4";
interface SliderProps {
  nextSection: any;
}
export const Slider: React.FC<SliderProps> = ({ nextSection }) => {
  return (
    <>
      <div className="home_video_background">
        <BackgroundVideo
          playsInline={true}            // play inline on iPhone. avoid triggering native video player
          // disableBackgroundCover={true} s // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
          css={{
            'video': {
              width: '100%',
            }
          }}
          className={"background_video"}
          containerWidth={window.innerWidth}
          containerHeight={window.innerHeight}
          muted={true}
          loop={true}
          autoPlay={true}
          src="/background.mp4"
        >

        </BackgroundVideo>
        <div className="main_banner_text">
          IMPARTIAL, remote, third-party <br /> estimating/adjusting
          </div>
        <div className="slider_down_btn" onClick={() => {
          window.scrollTo({ top: nextSection.current.offsetTop, behavior: 'smooth' })
        }}></div>
      </div>
    </>
  );
};
