import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';

import BeforeAfterSlider from 'react-before-after-slider'
import ReactCompareImage from 'react-compare-image';

import after from '../../../../assets/pre.jpg'
import before from '../../../../assets/post.jpg'
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
            title={"GROUND-TRUTH DATA EVERYONE TRUSTS"}
            description={"We have combined the best-of-breed technology platforms with an eye towards relieving you of administrative burden. Matterport 3D scans augmented by TrueSketch PLUS are used to generate consistent Xactimate sheets that are delivered in accord with Actionable Insights compliance rule sets. Each mpartial is produced with full transparency, unprecedented forensic photography, and infallible geospatial data that collectively result in rapid approvals."}
            type="left"
          ></SectionTitle>
          <div className="compare_images_section" ref={div}>
            <ReactCompareImage
              leftImage={before}
              rightImage={after}
              handle={(<Handle />)}
              sliderLineColor={"#3ac280"} />

          </div>
          <div className="try_now_btn">
            <Link to="/order">
              <button className="btn">
                Try Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
