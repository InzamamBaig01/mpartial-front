import * as React from 'react';

interface FooterProps {

}
import fb from '../../assets/facebook-logo.svg';
import inst from '../../assets/instagram.svg';
import twt from '../../assets/linkedin.svg';
export const Footer: React.FC<FooterProps> = () => {
  return(
    <div className={'footer'}>
      <div className={'container'}>
        <div className={'row'}>
        <div className={'col-md-6 col-sm-12'}>
          <p>2020 © mparitial a 4D Schematics Company. All rights reserved.</p>
        </div>
        <div className={'col-md-6 col-sm-12'}>
          <ul className={'social-links'}>
            <li><a target="_blank" href='https://www.facebook.com/mpartial1/'><img src={ fb }/> </a> </li>
            <li><a target="_blank" href='https://www.instagram.com/mpartial_/'><img src={ inst }/> </a></li>
            <li><a target="_blank" href='https://www.linkedin.com/company/mpartial-keep-building'><img src={ twt }/></a> </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}
