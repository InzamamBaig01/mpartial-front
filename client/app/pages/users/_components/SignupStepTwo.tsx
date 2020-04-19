import * as React from 'react';
import {css} from 'emotion';
import Mail from '../../../../assets/email.svg';
interface StepProps {
  step?:number;
  setStep?:Function;
}
export const SignupStepTwo:React.FC<StepProps> = (props) => {
  return(
    <>
      <div className={'container'}>
        <h2>Thanks, What's your name?</h2>
        <div className="form-group row justify-content-center">
          <div className={'col-md-3 col-xs-12'}>
          <div className="input-group" css={{maxWidth:'283px'}}>
            <input

              type="text"
              className="form-control"
              placeholder="First Name"
              autoComplete="off"
              required
            />
          </div>
          </div>
          <div className={'col-md-3 col-xs-12'}>
            <div className="input-group" css={{maxWidth:'283px'}}>
              <input

                type="text"
                className="form-control"
                placeholder="Last Name"
                autoComplete="off"
                required
              />
            </div>
          </div>
        </div>
        <button
          css={{maxWidth: '257px',marginTop:'30px'}}
          type="submit"
          className="btn btn-primary btn-block submit"
          onClick={() => props.setStep(3)}
        >
          Next
        </button>
      </div>
    </>
  )
}
