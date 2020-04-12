import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';

import BeforeAfterSlider from 'react-before-after-slider'
import ReactCompareImage from 'react-compare-image';

import after from '../../../../assets/exterior.jpg'
import before from '../../../../assets/interior.jpg'
import handle from '../../../../assets/compare_handle.png'

interface HeroSectionProps {

}
const Handle = () => {
  return (
    <>
    <img src={handle} alt="handle" />
    </>
  )
}

export const HeroSection: React.FC<HeroSectionProps> = ({ }) => {

  const [height, setHeight] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  const div = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="mpartial_section" ref={div}>
          <SectionTitle
            title={"GROUND-TRUTH DATA EVERYONE TRUST"}
            description={"Matterport Geospatial Scans, TruePlan Sketches, Actionable Insights Compliance, Xactimate Price List. We bring the best industry technology and experience to bear while relieving you of the administrative burden. Produced with full transparency and clear documentation that champions rapid approval."}
            type="left"
          ></SectionTitle>
          <div className="compare_images_section" ref={div}>
            {/* <BeforeAfterSlider
              before={before}
              after={after}
              width={width - 150}
              height={400}
              defaultProgress={0.5}
            /> */}
            <ReactCompareImage
              leftImage={before}
              rightImage={after}
              handle={(<Handle />)}
              sliderLineColor={"#3ac280"} />

          </div>
          <div className="try_now_btn">
            <button className="btn">
              Try Today
              </button>
          </div>
        </div>
      </div>
    </>
  )
}
