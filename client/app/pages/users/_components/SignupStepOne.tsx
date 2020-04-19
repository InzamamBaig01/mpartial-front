import * as React from 'react';
import {css} from 'emotion';
import Mail from '../../../../assets/email.svg';

interface StepProps {
  step?:number;
  setStep?:Function;
}
export const SignupStepOne:React.FC<StepProps> = (props) => {
  return(
    <>
      <div className={'container'}>
        <h2>Hello! I'm Partial. I'll get you signed up in <br/> seconds. Ready to go?</h2>
        <div className="form-group" css={{maxWidth:'464px',margin:'30px auto'}}>
          <div className="input-group">
            <img className="input_icon" src={Mail} alt=""/>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <button
          css={{maxWidth: '257px',marginTop:'30px'}}
          type="submit"
          className="btn btn-primary btn-block submit"
          onClick={() => props.setStep(2)}
        >
          Lets Do This
        </button>
      </div>
    </>
  )
}
