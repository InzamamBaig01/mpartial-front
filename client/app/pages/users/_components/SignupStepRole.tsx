import * as React from 'react';
import { css } from 'emotion';
import Mail from '../../../../assets/email.svg';
import { AuthContext } from 'contexts/authContext';

interface StepProps {
  step?: number;
  setStep?: Function;
}
export const SignupStepRole: React.FC<StepProps> = (props) => {

  const [role, setrole] = React.useState('');


  const {
    step4
  } = React.useContext(AuthContext);
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();

    step4({
      role: role,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setStep(5);
      } else {
        console.log(response);
      }
    });
  }

  return (
    <>
      <div className={'container'}>
        <h2>Select your role:</h2>
        <form onSubmit={onSubmit}>

          <div className={'row'}>
            <div className={'col-md-6'}>
              <div className="form-group">
                <label className="terms">
                  <input type="radio" id="role" name="role" onClick={() => setrole("STAFF ADJUSTER")} /> STAFF ADJUSTER
          </label>
              </div>
              <div className="form-group">
                <label className="terms">
                  <input type="radio" id="role" name="role" onClick={() => setrole("CONTRACTOR")} /> CONTRACTOR
          </label>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="form-group">
                <label className="terms">
                  <input type="radio" id="role" name="role" onClick={() => setrole("INDEPENDENT ADJUSTER")} /> INDEPENDENT ADJUSTER
          </label>
              </div>
              <div className="form-group">
                <label className="terms">
                  <input type="radio" id="role" name="role" onClick={() => setrole("SPECIALITY VENDOR")} /> SPECIALITY VENDOR
          </label>
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
