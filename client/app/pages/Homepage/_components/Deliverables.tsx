import * as React from "react";
import SectionTitle from "app/components/SectionTitle";
import { DeliverablesBox } from "./deliverablesBoxWidget";
import { DeliverSlider } from "./DelieverSlider";
import LazyLoad from "react-lazyload";

import sketch from "../../../../assets/TS_Plus_Front.png";
import sketch2 from "../../../../assets/TS_Plus_Top_View.png";
interface DeliverablesProps {}
const Deliverables: React.FC<DeliverablesProps> = ({}) => {
  return (
    <>
      <div
        className="mpartial_section howitworks"
        css={{
          backgroundColor: "#F2F6F7",
          justifyContent: "center",
          textAlign: "center",
          color: "#0A5169",
          padding: "15px 0",
        }}
      >
        <div className="container">
          <SectionTitle
            title={""}
            title2={"Example Deliverables"}
            description={""}
            type="center"
          ></SectionTitle>
          <h3 className={"widget-title sub mt-1"}>
            Pre-Mitigation Scan + Post-Mitigation Scan = ESX & SKX (TruePlan)
          </h3>
          <LazyLoad offset={50}>
            <div className={"deliver_widget_container"}>
              <DeliverablesBox
                title={""}
                url={"https://my.matterport.com/show/?m=e5Wxtu8Arbx"}
              />
              <span className={"numeric-character"}></span>
              <DeliverablesBox
                title={""}
                url={"https://my.matterport.com/show/?m=DhqzGgT7M1E"}
              />
            </div>
          </LazyLoad>

          <span className={"numeric-character"}></span>
          <div className={"deliver-slider"}>
            <h3 className={"widget-title sub mt-1"}>
              Immaculate. Impartial. [ESX]
            </h3>
            <DeliverSlider />
          </div>
          <div className={"sketch-widget"}>
            <h3 className={"widget-title sub mt-1"}>
              <a
                href="https://support.matterport.com/hc/en-us/articles/360001452428-Matterport-TrueSketch-and-TrueSketch-PLUS-for-Xactimate"
                target="_blank"
                rel="noopener"
              >
                TruePlan [SKX]
              </a>
            </h3>
            <section className={"sketch-container"}>
              <img src={sketch} loading="lazy" alt="first sketch" />
              <img src={sketch2} loading="lazy" alt="second sketch" />
              <div></div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deliverables;
