import * as React from "react";
import { withRouter, Link } from "react-router-dom";
import SectionTitle from "app/components/SectionTitle";
import { DeliverablesBox } from "./deliverablesBoxWidget";
import { DeliverSlider } from "./DelieverSlider";
import mitigation from "../../../../assets/deliverable-1.png";
import mitigation2 from "../../../../assets/deliverable-2.png";

import sketch from "../../../../assets/sketch-1.png";
import sketch2 from "../../../../assets/sketch2.png";
interface DeliverablesProps {}
export const Deliverables: React.FC<DeliverablesProps> = ({}) => {
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
            title={"Example Deliverables"}
            description={""}
            type="center"
          ></SectionTitle>
          <h3 className={"widget-title sub mt-1"}>
            Pre-Mitigation Scan + Post-Mitigation Scan = ESX & SKX (TrueSketch PLUS)
          </h3>
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
          <span className={"numeric-character"}></span>
          <div className={"deliver-slider"}>
            <h3 className={"widget-title sub mt-1"}>
              Immaculate. Impartial. [ESX]
            </h3>
            <DeliverSlider />
          </div>
          <div className={"sketch-widget"}>
            <h3 className={"widget-title sub mt-1"}>
              <a href="https://support.matterport.com/hc/en-us/articles/360001452428-Matterport-TrueSketch-and-TrueSketch-PLUS-for-Xactimate" target="_blank">
                TrueSketch PLUS [SKX]
              </a>
            </h3>
            <section className={"sketch-container"}>
              <img src={sketch} />
              <img src={sketch2} />
              <div></div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
