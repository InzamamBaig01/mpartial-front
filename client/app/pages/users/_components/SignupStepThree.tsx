import * as React from "react";
import { css } from "emotion";
import Password from "../../../../assets/password.svg";
import { AuthContext } from "contexts/authContext";
import { Link } from "react-router-dom";
interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepThree: React.FC<StepProps> = (props) => {
  const [password, setpassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(true);

  const { step5 } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();
    step5({
      password: password,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setStep(6);
      } else {
        console.log(response);
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
                  confirmPassword(e.currentTarget.value);
                }}
              />
            </div>
            {!validPassword ? (
              <span className="password_not_matched">
                Passwords does not match
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input type="checkbox" required />{" "}
            <label className="terms">
              I’ve read and accept the mpartial{" "}
              <Link to="/terms" className="underline" target="_blank">
                Terms & Conditions.<span className="red">*</span>
              </Link>
            </label>
          </div>
          <button
            css={{ maxWidth: "257px", marginTop: "30px" }}
            type="submit"
            id="formButton"
            disabled={!validPassword || password.length==0 }
            className="btn btn-primary btn-block submit"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};
