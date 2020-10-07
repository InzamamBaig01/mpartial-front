import * as React from 'react';
import { css } from 'emotion';
import Password from '../../../../assets/password.svg';
import { AuthContext } from 'contexts/authContext';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Loader from 'app/components/Loader';

import ReCAPTCHA from 'react-google-recaptcha';
import appConfig from '../../../../appconfig.json';

import { AppAlertsContext } from 'contexts/appAlertsContext';
import { useState } from 'react';
import FloatingLabel from 'app/components/FloatingLabel';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
interface StepProps {
  step?: number;
  setStep?: Function;
  formData: any;
  setFormData: Function;
}
export const SignupStepThree: React.FC<StepProps> = (props) => {
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [validCheckbox, setValidCheckbox] = useState(false);

  const [isHuman, setIshuman] = useState(false);
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

  const onCaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    if (value) setIshuman(true);
  };

  const passwordRef = React.createRef();
  const cpasswordRef = React.createRef();

  return (
    <>
      <div className={'container'}>
        <h2>Final Step! Please Enter Your Password</h2>
        <form onSubmit={onSubmit}>
          <div
            className='form-group'
            css={{ maxWidth: '464px', margin: '30px auto' }}
          >
            <div className='input-group'>
              <img className='input_icon' src={Password} alt='' />
              <input
                type='password'
                className='form-control'
                placeholder=''
                ref={passwordRef}
                autoComplete='off'
                required
                onChange={(e) => {
                  setpassword(e.currentTarget.value);
                }}
              />
              <FloatingLabel
                inputRef={passwordRef}
                label='Password'
                inputValue={password}
              />
            </div>
          </div>
          <div
            className='form-group'
            css={{ maxWidth: '464px', margin: '30px auto' }}
          >
            <div className='input-group'>
              <img className='input_icon' src={Password} alt='' />
              <input
                type='password'
                className='form-control'
                placeholder=''
                autoComplete='off'
                required
                ref={cpasswordRef}
                onChange={(e) => {
                  setcpassword(e.currentTarget.value);
                  confirmPassword(e.currentTarget.value);
                }}
              />
              <FloatingLabel
                inputRef={cpasswordRef}
                label='Confirm Password'
                inputValue={cpassword}
              />
            </div>
                <ReactIsCapsLockActive>
                    {active => <span className="password_not_matched"> {active ? 'Your Caps lock is on' :''}</span>}
                </ReactIsCapsLockActive>
            {!validPassword && cpassword.length !== 0 ? (
              <span className='password_not_matched'>
                Passwords does not match
              </span>
            ) : (
              ''
            )}
          </div>
          <div className='form-group'>
            <input
              type='checkbox'
              required
              onChange={(e) => setValidCheckbox(e.currentTarget.checked)}
            />{' '}
            <label className='terms'>
              I’ve read and accept the mpartial{' '}
              <Link to='/terms' className='underline' target='_blank'>
                Terms & Conditions
              </Link>
              <span className='red'>*</span>
            </label>
          </div>
          <ReCAPTCHA
            sitekey={appConfig.captchaKey}
            onChange={onCaptchaChange}
            className='captcha_box'
          />
          <button
            css={{ maxWidth: '257px', marginTop: '30px' }}
            type='submit'
            id='formButton'
            disabled={
              !validPassword ||
              password.length == 0 ||
              !validCheckbox ||
              !isHuman
            }
            className='btn btn-primary btn-block submit'
          >
            <Loader text='Create'></Loader>
          </button>
        </form>
      </div>
    </>
  );
};
