import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';
interface ConatctUsProps {

}
export const ContactUs: React.FC<ConatctUsProps>  = ({}) => {
  return(
    <>
      <div className="mpartial_section contact_us" css={{backgroundColor:'#FFFFFF',justifyContent:'center',textAlign:'center',color:'#0A5169',padding:'15px 0'}}>
        <div className={'container'}>
        <SectionTitle
          title={"Contact Us"}
          description={""}
          type="center"
        ></SectionTitle>
          <div className={'form-holder'}>
            <form>
              <div className={'row'}>
              <div className={'col'}>
                <input type={'text'} placeholder={'Your Name'} name={'name'}/>
                <input type={'text'} placeholder={'Email'} name={'email'}/>
                <input type={'text'} placeholder={'Phone Number'} name={'phone'}/>
              </div>
              <div className={'col'}>
              <textarea placeholder={'Write your message...'}></textarea>
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
