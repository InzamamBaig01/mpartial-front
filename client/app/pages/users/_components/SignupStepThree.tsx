import * as React from "react";
import { css } from "emotion";
import Password from "../../../../assets/password.svg";
import { AuthContext } from "contexts/authContext";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Loader from "app/components/Loader";

import { AppAlertsContext } from "contexts/appAlertsContext";
interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepThree: React.FC<StepProps> = (props) => {
  const [password, setpassword] = React.useState("");
  const [cpassword, setcpassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);
  const [validCheckbox, setValidCheckbox] = React.useState(false);

  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  // const stringified = queryString.stringify({
  //   password: password,
  //   emailaddress: props.formData.email,
  //   firstname: props.formData.firstname,
  //   lastname: props.formData.lastname,
  //   phonenumber: props.formData.phone,
  //   role: props.formData.role,
  // });
  // console.log(stringified);
  // return;
  const { step5 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();
    showLoader();
    step5({
      password: password,
      emailaddress: props.formData.email,
      firstname: props.formData.firstname,
      lastname: props.formData.lastname,
      phonenumber: props.formData.phone,
      role: props.formData.role,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setStep(6);
        hideLoader();
      } else {
        console.log(response);
        hideLoader();
      }
    });
  };

  const confirmPassword = (cp) => {
    setValidPassword(cp == password);
  };
  return (
    <>
      <div className={"container"}>
        <h2>Final Step! Please Enter Your Password</h2>
        <form onSubmit={onSubmit}>
          <div
            className="form-group"
            css={{ maxWidth: "464px", margin: "30px auto" }}
          >
            <div className="input-group">
              <img className="input_icon" src={Password} alt="" />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="off"
                required
                onChange={(e) => {
                  setpassword(e.currentTarget.value);
                }}
              />
            </div>
          </div>
          <div
            className="form-group"
            css={{ maxWidth: "464px", margin: "30px auto" }}
          >
            <div className="input-group">
              <img className="input_icon" src={Password} alt="" />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                autoComplete="off"
                required
                onChange={(e) => {
                  setcpassword(e.currentTarget.value);
                  confirmPassword(e.currentTarget.value);
                }}
              />
            </div>
            {!validPassword && cpassword.length !== 0 ? (
              <span className="password_not_matched">
                Passwords does not match
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              required
              onChange={(e) => setValidCheckbox(e.currentTarget.checked)}
            />{" "}
            <label className="terms">
              I’ve read and accept the mpartial{" "}
              <Link to="/terms" className="underline" target="_blank">
                Terms & Conditions
              </Link>{" "}
              <span className="red">*</span>
            </label>
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            id="formButton"
            disabled={!validPassword || password.length == 0 || !validCheckbox}
            className="btn btn-primary btn-block submit"
          >
            Create
            <Loader></Loader>
          </button>
        </form>
      </div>
    </>
  );
};
