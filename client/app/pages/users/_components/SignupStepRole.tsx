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
            <div className={'role_holder'}>
            <div className={'col-md-6 col-sm-12'}>
              <div className="form-group">
                <input type="radio" id="staff" name="radio-group" onClick={() => setrole("STAFF ADJUSTER")} />
                  <label htmlFor="staff">STAFF ADJUSTER</label>
              </div>
              <div className="form-group">
                <input type="radio" id="cont" name="radio-group" onClick={() => setrole("CONTRACTOR")} />
                  <label htmlFor="cont">CONTRACTOR</label>
              </div>
            </div>
            <div className={'col-md-6 col-sm-12'}>
              <div className="form-group">
                <input type="radio" id="ind" name="radio-group" onClick={() => setrole("INDEPENDENT ADJUSTER")} />
                <label htmlFor="ind">INDEPENDENT ADJUSTER</label>
              </div>
              <div className="form-group">
                <input type="radio" id="adj" name="radio-group" onClick={() => setrole("SPECIALITY VENDOR")} />
                <label htmlFor="adj"> SPECIALITY VENDOR</label>
              </div>
            </div>
            <div className={'col-md-6 col-sm-12'}>
              <div className="form-group">
                <input type="radio" id="inds" name="radio-group" onClick={() => setrole("PA/ESQ")} />
                <label htmlFor="inds">PA/ESQ</label>
              </div>
              <div className="form-group">
                <input type="radio" id="adjs" name="radio-group" onClick={() => setrole("Other  ")} />
                <label htmlFor="adjs"> Other  </label>
              </div>
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
