import * as React from 'react';
import { css } from 'emotion';
import Password from '../../../../assets/password.svg';
import { AuthContext } from 'contexts/authContext';
interface StepProps {
  step?: number;
  setStep?: Function;
}
export const SignupStepThree: React.FC<StepProps> = (props) => {


  const [password, setpassword] = React.useState('');
  const [validPassword, setValidPassword] = React.useState(true);


  const {
    step5
  } = React.useContext(AuthContext);
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
  }


  const confirmPassword = (cp) => {
    setValidPassword(cp == password)
  }
  return (
    <>
      <div className={'container'}>
        <h2>Final Step! Please Enter Your Password</h2>
        <form onSubmit={onSubmit}>

          <div className="form-group" css={{ maxWidth: '464px', margin: '30px auto' }}>
            <div className="input-group">
              <img className="input_icon" src={Password} alt="" />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="off"
                required
                onChange={(e) => { setpassword(e.currentTarget.value) }}

              />
            </div>
          </div>
          <div className="form-group" css={{ maxWidth: '464px', margin: '30px auto' }}>
            <div className="input-group">
              <img className="input_icon" src={Password} alt="" />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                autoComplete="off"
                required
                onChange={(e) => { confirmPassword(e.currentTarget.value) }}
              />
            </div>
            {
              !validPassword ? (<span className="red">Password not match</span>) : ''
            }

          </div>
          <button
            css={{ maxWidth: '257px', marginTop: '30px' }}
            type="submit"
            disabled={!validPassword}
            className="btn btn-primary btn-block submit"
          >
            Create
        </button>
        </form>
      </div>
    </>
  )
}
