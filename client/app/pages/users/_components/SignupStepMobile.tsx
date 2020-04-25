import * as React from 'react';
import { css } from 'emotion';
import Mail from '../../../../assets/email.svg';
import { AuthContext } from 'contexts/authContext';

interface StepProps {
  step?: number;
  setStep?: Function;
}
export const SignupStepMobile: React.FC<StepProps> = (props) => {

  const [phonenumber, setphonenumber] = React.useState('');


  const {
    step3,
    signupDetails,
  } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();

    step3({
      phonenumber: phonenumber,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setStep(4);
      } else {
        console.log(response);
      }
    });
  }

  return (
    <>
      <div className={'container'}>
        <h2>Nice to meet you {signupDetails.lastname}! What's your <br /> mobile number?</h2>
        <form onSubmit={onSubmit}>

          <div className="form-group" css={{ maxWidth: '464px', margin: '30px auto' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                autoComplete="off"
                required
                onChange={(e) => { setphonenumber(e.currentTarget.value) }}
              />
            </div>
          </div>
          <button
            css={{ maxWidth: '257px', marginTop: '30px' }}
            type="submit"
            className="btn btn-primary btn-block submit"
          >
            Next
        </button>
        </form>
      </div>
    </>
  )
}
