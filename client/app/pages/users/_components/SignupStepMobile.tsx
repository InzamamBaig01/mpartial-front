import * as React from 'react';
import { css } from 'emotion';
import Mail from '../../../../assets/email.svg';
import { AuthContext } from 'contexts/authContext';
import InputMask from 'react-input-mask';

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


              <InputMask mask="999-999-9999" onChange={(e) => { setphonenumber(e.currentTarget.value) }} value={phonenumber}>
                {(inputProps) => <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  min="1"
                  required
                  step="any"
                />}
              </InputMask>
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
