import * as React from "react";
import { css } from "emotion";
import Mail from "../../../../assets/email.svg";
import { AuthContext } from "contexts/authContext";
import InputMask from "react-input-mask";
import Loader from "app/components/Loader";
import { AppAlertsContext } from "contexts/appAlertsContext";

interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepMobile: React.FC<StepProps> = (props) => {
  const [phonenumber, setphonenumber] = React.useState(
    props.formData.phone ? props.formData.phone : ""
  );

  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);

  const { step3, signupDetails } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();
    showLoader();

    step3({
      phonenumber: phonenumber,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setFormData({
          ...props.formData,
          phone: phonenumber,
        });
        props.setStep(4);
        hideLoader();
      } else {
        hideLoader();
        console.log(response);
      }
    });
  };
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return (
    <>
      <div className={"container"}>
        <h2>
          Nice to meet you {signupDetails.lastname}! What's your <br /> Cell
          number?
        </h2>
        <form onSubmit={onSubmit}>
          <div
            className="form-group"
            css={{ maxWidth: "264px", margin: "30px auto" }}
          >
            <div className="input-group">
              <InputMask
                mask="999-999-9999"
                onChange={(e) => {
                  setphonenumber(e.currentTarget.value);
                //  console.log();
                }}
                value={phonenumber}
              >
                {(inputProps) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cell"
                    min="1"
                    value={phonenumber}
                    required
                    step="any"
                  />
                )}
              </InputMask>
            </div>
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            id="formButton"
            disabled={
              phonenumber.length == 0 || phonenumber.match(phoneno) == null
            }
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
