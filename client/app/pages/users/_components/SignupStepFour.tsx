import * as React from 'react';
interface StepProps {
  step?:number;
  setStep?:Function;
}
export const SignupStepFour = ({step,setStep}) => {
  return(
    <>
      <div className={'container'}>
        <h2>You're all set! Please check your inbox and <br/> verify your email.</h2>
        <button
          css={{maxWidth: '257px',marginTop:'30px'}}
          type="submit"
          className="btn btn-primary btn-block submit"
        >
          Continue
        </button>
      </div>
    </>
  )
}
