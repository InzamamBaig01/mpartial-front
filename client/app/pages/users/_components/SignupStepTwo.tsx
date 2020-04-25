import * as React from 'react';
import { css } from 'emotion';
import Mail from '../../../../assets/email.svg';
import { AuthContext } from 'contexts/authContext';
interface StepProps {
  step?: number;
  setStep?: Function;
}
export const SignupStepTwo: React.FC<StepProps> = (props) => {


  const [firstname, setfirstname] = React.useState('');

  const [lastname, setlastname] = React.useState('');

  const {
    step2
  } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();

    step2({
      firstname: firstname,
      lastname: lastname,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setStep(3);
      } else {
        console.log(response);
      }
    });
  }
  return (
    <>
      <div className={'container'}>
        <h2>Thanks, What's your name?</h2>
        <form onSubmit={onSubmit}>

          <div className="form-group row justify-content-center step-two-field">
            <div className={'col-md-3 col-xs-12'}>
              <div className="input-group" css={{ maxWidth: '283px' }}>
                <input

                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                  onChange={(e) => { setfirstname(e.currentTarget.value) }}

                />
              </div>
            </div>
            <div className={'col-md-3 col-xs-12'}>
              <div className="input-group" css={{ maxWidth: '283px' }}>
                <input

                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                  onChange={(e) => { setlastname(e.currentTarget.value) }}

                />
              </div>
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
