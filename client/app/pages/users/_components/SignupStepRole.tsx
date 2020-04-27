import * as React from "react";
import { css } from "emotion";
import Mail from "../../../../assets/email.svg";
import { AuthContext } from "contexts/authContext";

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

  const { step4 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();

    step4({
      role: role,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setFormData({
          ...props.formData,
          role: role,
        });
        props.setStep(5);
      } else {
        console.log(response);
      }
    });
  };

  return (
    <>
      <div className={"container"}>
        <h2>Select your role:</h2>
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
                  defaultChecked={role == "SPECIALITY VENDOR"}
                  name="radio-group"
                  onClick={() => setrole("SPECIALITY VENDOR")}
                />
                <label htmlFor="adj"> SPECIALITY VENDOR</label>
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
                  defaultChecked={role == "Other"}
                  name="radio-group"
                  onClick={() => setrole("Other")}
                />
                <label htmlFor="adjs"> Other </label>
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
          </button>
        </form>
      </div>
    </>
  );
};
