import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { SignupStepOne } from './_components/SignupStepOne';
import {SignupStepTwo} from './_components/SignupStepTwo';
import {SignupStepThree} from './_components/SignupStepThree';
import {SignupStepFour} from './_components/SignupStepFour';
import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import question from "../../../assets/question.svg";
import left from "../../../assets/left.svg";

interface IProps {}
export const Signup: React.FC<IProps> = ({ ...props }) => {
  const {
    loginError,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
  } = useContext(AuthContext);

  const [loginStatus, setLoginStatus] = useState(loginError);
  const handleEmailChange = (e: any) => emailOnChange(e.target.value);
  const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatchLogin();
  };

  useEffect(() => {
    setLoginStatus(loginError);
  }, [status, loginError]);

  const [stepVal,setStepVal] = React.useState(1);
  const changeValue = (val) => {
    setStepVal(val);
  };
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="login_page ">
        <div className={'signup_header'}>
          <div className={'container'}>
            <div className="signUp_actions">
              <ul>
                <li><a onClick={() => setStepVal(stepVal > 1 ? stepVal -1 : 1)}><img src={left} /></a></li>
                <li><a href={'#'}><img src={question} /></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="signup_holder">
            {stepVal === 1 &&
            <SignupStepOne
            step={stepVal}
            setStep={changeValue}/>
            }
            {stepVal === 2 &&
            <SignupStepTwo
                setStep={changeValue}
                step={stepVal}/>
            }
            {stepVal === 3 &&
            <SignupStepThree
                setStep={changeValue}
                step={stepVal}/>
            }
            {stepVal === 4 &&
            <SignupStepFour
                setStep={changeValue}
                step={stepVal}/>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Signup);


