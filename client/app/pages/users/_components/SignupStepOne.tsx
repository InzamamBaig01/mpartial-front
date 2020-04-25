import * as React from 'react';
import { css } from 'emotion';
import Mail from '../../../../assets/email.svg';
import { AuthContext } from 'contexts/authContext';

interface StepProps {
  step?: number;
  setStep?: Function;
}
export const SignupStepOne: React.FC<StepProps> = (props) => {

  const [value, setValue] = React.useState('');

  const {
   step1
  } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();
    step1({
      emailaddress: value,
    }).subscribe((response) => {
      if(response.response.Requested_Action){
        props.setStep(2);
      }else{
        console.log(response);
      }
    });
  }
  return (
    <>
      <div className={'container'}>
        <h2>Hello! I'm Partial. I'll get you signed up in <br /> seconds. Ready to go?</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group" css={{ maxWidth: '464px', margin: '30px auto' }}>
            <div className="input-group">
              <img className="input_icon" src={Mail} alt="" />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                autoComplete="off"
                required
                onChange={(e) => { setValue(e.currentTarget.value) }}
              />
            </div>
          </div>
          <button
            css={{ maxWidth: '257px', marginTop: '30px' }}
            type="submit"
            className="btn btn-primary btn-block submit"
          >
            Lets Do This
        </button>
        </form>
      </div>
    </>
  )
}
