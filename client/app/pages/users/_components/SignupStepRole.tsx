import * as React from "react";
import { css } from "emotion";
import Mail from "../../../../assets/email.svg";
import { AuthContext } from "contexts/authContext";
import Loader from "app/components/Loader";

import { AppAlertsContext } from "contexts/appAlertsContext";
interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepRole: React.FC<StepProps> = (props) => {
  const [role, setrole] = React.useState(
    props.formData.role ? props.formData.role : ""
  );

  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const { step4 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();

    showLoader();
    step4({
      role: role,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setFormData({
          ...props.formData,
          role: role,
        });
        props.setStep(5);
        hideLoader();
      } else {
        console.log(response);
        hideLoader();
      }
    });
  };

  return (
    <>
      <div className={"container"}>
        <h2>What best describes you?</h2>
        <form onSubmit={onSubmit}>
          <div className={"row"}>
            <div className={"role_holder"}>
              <div className="form-group">
                <input
                  type="radio"
                  id="staff"
                  name="radio-group"
                  defaultChecked={role == "STAFF ADJUSTER"}
                  onClick={() => setrole("STAFF ADJUSTER")}
                />
                <label htmlFor="staff">STAFF ADJUSTER</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="cont"
                  defaultChecked={role == "CONTRACTOR"}
                  name="radio-group"
                  onClick={() => setrole("CONTRACTOR")}
                />
                <label htmlFor="cont">CONTRACTOR</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="ind"
                  defaultChecked={role == "INDEPENDENT ADJUSTER"}
                  name="radio-group"
                  onClick={() => setrole("INDEPENDENT ADJUSTER")}
                />
                <label htmlFor="ind">INDEPENDENT ADJUSTER</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="adj"
                  defaultChecked={role == "SPECIALTY VENDOR"}
                  name="radio-group"
                  onClick={() => setrole("SPECIALTY VENDOR")}
                />
                <label htmlFor="adj"> SPECIALTY VENDOR</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="inds"
                  defaultChecked={role == "PA/ESQ"}
                  name="radio-group"
                  onClick={() => setrole("PA/ESQ")}
                />
                <label htmlFor="inds">PA/ESQ</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="adjs"
                  defaultChecked={role == "OTHER"}
                  name="radio-group"
                  onClick={() => setrole("OTHER")}
                />
                <label htmlFor="adjs"> OTHER </label>
              </div>
            </div>
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            id="formButton"
            disabled={role.length == 0}
            className="btn btn-primary btn-block submit"
          >
            Next
            <Loader></Loader>
          </button>
        </form>
      </div>
    </>
  );
};
