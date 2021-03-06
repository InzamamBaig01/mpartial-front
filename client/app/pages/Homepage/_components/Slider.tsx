import * as React from "react";
import { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import BackgroundVideo from "react-background-video-player";
import appConfig from "../../../../appconfig.json";

interface SliderProps {
  nextSection: any;
}
export const Slider: React.FC<SliderProps> = ({ nextSection }) => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [show, setShow] = useState(false);
  const handleResize = () => {
    //console.log(window.innerHeight,window.innerWidth)
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 4000);
  }, []);

  return (
    <>
      <div className="home_video_background">
        {show ? (
          <LazyLoad height={200}>
            <BackgroundVideo
              playsInline={true} // play inline on iPhone. avoid triggering native video player
              disableBackgroundCover={false}
              css={{
                video: {
                  width: "100%",
                },
              }}
              className={"background_video"}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
              muted={true}
              loop={true}
              autoPlay={true}
              // src="/background.mp4"
              src={appConfig.videoFile}
            ></BackgroundVideo>
          </LazyLoad>
        ) : (
          <></>
        )}

        <div className="main_banner_text">
          Impartial, Remote, 3rd-Party,
          <br /> Estimating Engine
        </div>

        <div
          className="slider_down_btn"
          onClick={() => {
            window.scrollTo({
              top: nextSection.current.offsetTop,
              behavior: "smooth",
            });
          }}
        ></div>
      </div>
    </>
  );
};
