import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';
import {DeliverablesBox} from './deliverablesBoxWidget';
import {DeliverSlider} from './DelieverSlider';

interface DeliverablesProps {

}
export const Deliverables: React.FC<DeliverablesProps>  = ({}) => {
  return(
    <>
      <div className="mpartial_section howitworks" css={{backgroundColor:'#F2F6F7',justifyContent:'center',textAlign:'center',color:'#0A5169',padding:'15px 0'}}>
        <div className="container">
          <SectionTitle
            title={"Example Deliverables"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className={'deliver_widget_container'}>
            <DeliverablesBox
              title={'Pre-Mitigation'}
              imgUrl={'../../../../assets/deliverable-1.png'}
            />
            <span className={'numeric-character'}>+</span>
            <DeliverablesBox
            title={'Post-Mitigation'}
            imgUrl={'../../../../assets/deliverable-2.png'}
            />
          </div>
          <span className={'numeric-character'}>=</span>
          <div className={'deliver-slider'}>
            <h3 className={'widget-title'}>Immaculate. Impartial. [ESX & PDF]</h3>
            <DeliverSlider/>
          </div>
          <div className={'sketch-widget'}>
            <h3 className={'widget-title'}>TrueSketch PLUS [SKX]</h3>
            <section className={'sketch-container'}>
              <img src={'../../../../assets/sketch-1.png'} />
              <img src={'../../../../assets/sketch2.png'}/>
              <div></div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
