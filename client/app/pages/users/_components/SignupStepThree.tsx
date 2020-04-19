import * as React from 'react';
import {css} from 'emotion';
import Password from '../../../../assets/password.svg';
interface StepProps {
  step?:number;
  setStep?:Function;
}
export const SignupStepThree:React.FC<StepProps> = (props) => {
  return(
    <>
      <div className={'container'}>
        <h2>Final Step! Please Enter Your Password</h2>
        <div className="form-group" css={{maxWidth:'464px',margin:'30px auto'}}>
          <div className="input-group">
            <img className="input_icon" src={Password} alt=""/>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="form-group" css={{maxWidth:'464px',margin:'30px auto'}}>
          <div className="input-group">
            <img className="input_icon" src={Password} alt=""/>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <button
          css={{maxWidth: '257px',marginTop:'30px'}}
          type="submit"
          className="btn btn-primary btn-block submit"
          onClick={() => props.setStep(4)}
        >
          Create
        </button>
      </div>
    </>
  )
}
