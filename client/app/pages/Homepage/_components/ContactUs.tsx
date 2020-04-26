import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';

import InputMask from 'react-input-mask';

interface ConatctUsProps {

}
export const ContactUs: React.FC<ConatctUsProps> = ({ }) => {
  return (
    <>
      <div className="mpartial_section contact_us" css={{ backgroundColor: '#FFFFFF', justifyContent: 'center', textAlign: 'center', color: '#0A5169', padding: ' 0' }}>
        <div className={'container'}>
          <SectionTitle
            title={"Contact Us"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className={'form-holder'}>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <div className={'row'}>
                <div className={'col-md-6 col-sm-12'}>
                  <input type={'text'} placeholder={'Your Name'} name={'name'} required />
                  <input type={'email'} placeholder={'Email'} name={'email'} required />
                  <InputMask mask="999-999-9999" onChange={(e) => { }}>
                    {(inputProps) => <input
                      type="text"
                      placeholder="Phone Number"
                      min="1"
                      required
                      step="any"
                    />}
                  </InputMask>
                </div>
                <div className={'col-md-6 col-sm-12'}>
                  <textarea placeholder={'Write your message...'} required></textarea>
                </div>
              </div>
              <input type={'submit'} className="btn btn-green" value={'Submit'} />

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
