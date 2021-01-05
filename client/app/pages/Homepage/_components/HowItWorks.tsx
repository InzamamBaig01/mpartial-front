import * as React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "app/components/SectionTitle";
import DataPoint from "app/components/DataPoint";
import { AuthContext } from "contexts/authContext";
interface HowItWorksProps {}
const HowItWorks: React.FC<HowItWorksProps> = ({}) => {
  const { isUserAuthenticated } = React.useContext(AuthContext);

  const dataPoints = [
    "Perform pre-mitigation and post-mitigation scans with a Matterport Pro Series camera.",
    "Submit the Matterport scans via the mpartial portal and then go back to what you do great.",
    "Receive a well-formatted, fully documented Xactimate PDF, ESX & Matterport TruePlan PLUS SKX.",
  ];
  return (
    <>
      <div className="mpartial_section howitworks">
        <div className="container">
          <SectionTitle
            title={""}
            title2={"How It Works"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className="data_points">
            <div className="row no-gutters">
              {dataPoints.map((point, index) => {
                return (
                  <div className="col-md-4 col-sm-12" key={index}>
                    <DataPoint
                      point={{
                        point: point,
                        number: index + 1,
                      }}
                    ></DataPoint>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="try_now_btn">
            <Link to={isUserAuthenticated() ? `/order` : `/login`}>
              <button className="btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
