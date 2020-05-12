import * as React from "react";
import { css } from "emotion";
import Mail from "../../../../assets/email.svg";
import { AuthContext } from "contexts/authContext";
import { AppAlertsContext } from "contexts/appAlertsContext";
import Loader from "app/components/Loader";
interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepTwo: React.FC<StepProps> = (props) => {
  const [firstname, setfirstname] = React.useState(
    props.formData.firstname ? props.formData.firstname : ""
  );

  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const [lastname, setlastname] = React.useState(
    props.formData.lastname ? props.formData.lastname : ""
  );
  // console.log(props.formData);
  const { step2 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();

    showLoader();
    step2({
      firstname: firstname,
      lastname: lastname,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setFormData({
          ...props.formData,
          firstname: firstname,
          lastname: lastname,
        });
        props.setStep(3);
        hideLoader();
      } else {
        //console.log(response);
        hideLoader();
      }
    });
  };
  return (
    <>
      <div className={"container"}>
        <h2>Thanks, What's your name?</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group row justify-content-center step-two-field">
            <div className={"col-md-4 col-sm-6 col-xs-12"}>
              <div className="input-group" css={{ maxWidth: "283px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                  value={firstname}
                  onChange={(e) => {
                    setfirstname(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <div className={"col-md-4 col-sm-6 col-xs-12"}>
              <div className="input-group" css={{ maxWidth: "283px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  autoComplete="off"
                  value={lastname}
                  required
                  onChange={(e) => {
                    setlastname(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            id="formButton"
            disabled={firstname.length == 0 || lastname.length == 0}
            className="btn btn-primary btn-block submit"
          >
            <Loader text="Next"></Loader>
          </button>
        </form>
      </div>
    </>
  );
};
