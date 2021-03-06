import * as React from "react";
import { useEffect } from "react";
import { css } from "emotion";
import Mail from "../../../../assets/email.svg";
import { AuthContext } from "contexts/authContext";
import Loader from "app/components/Loader";
import { AppAlertsContext } from "contexts/appAlertsContext";
import FloatingLabel from "app/components/FloatingLabel";

interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepOne: React.FC<StepProps> = (props) => {
  const [value, setValue] = React.useState(props.formData.email);
  const [error, setError] = React.useState(false);
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);

  const { step1 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();
    showLoader();
    step1({
      emailaddress: value,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setFormData({
          ...props.formData,
          email: value,
        });
        props.setStep(2);

        hideLoader();
      } else {
        hideLoader();
        setError(response.response.Message);
      }
    });
  };

  useEffect(() => {
    if (props.inviteEmail) {
      setValue(props.inviteEmail);
    }
  }, []);
  const emailRef = React.createRef();
  return (
    <>
      <div className={"container"}>
        <h2>
          Hello! I'm Joe. I'll get you signed up in <br /> seconds. Ready to go?
        </h2>
        <form onSubmit={onSubmit}>
          <div
            className="form-group"
            css={{ maxWidth: "464px", margin: "30px auto" }}
          >
            <div className="input-group">
              <img className="input_icon" src={Mail} alt="" />
              <input
                type="email"
                className="form-control"
                placeholder=""
                autoComplete="off"
                required
                ref={emailRef}
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
              />
              <FloatingLabel
                inputRef={emailRef}
                label="Email"
                inputValue={value}
              />
            </div>
            {error ? <span className="password_not_matched">{error}</span> : ""}
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            disabled={value.length == 0}
            id="formButton"
            className="btn btn-primary btn-block submit"
          >
            <Loader text="Lets Do This"></Loader>
          </button>
        </form>
      </div>
    </>
  );
};
