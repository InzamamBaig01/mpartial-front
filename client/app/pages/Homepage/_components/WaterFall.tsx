import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';
import Slider from 'react-rangeslider';
import {css} from 'emotion';

interface WaterFallProps {

}

export const WaterFall: React.FC<WaterFallProps> = ({ }) => {

  const [volume, setVolume] = React.useState(0);
  const onChangeRange = (v) => {
    setVolume(v);
  }
  return (
    <>
      <div className="mpartial_section" css={{backgroundColor:'#FFFFFF',justifyContent:'center',textAlign:'center',color:'#0A5169',paddingBottom:'20px'}}>
        <div className="container">
          <SectionTitle
            title={"mpartial Waterfall Fee Structure"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className="slider" css={{margin:'200px 0 100px'}}>
          <Slider
            min={0}
            max={1000000}
            tooltip={true}
            step={5}
            value={volume}
            format={(v) => `$${v}`}
            oriientation={'vertical'}
            onChange={onChangeRange}
          />
          <ul css={{
            listStyle:'none',
            padding:'0 0 0 15px',
            display:'flex',
            justifyContent:'space-between',
            'li':{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              width: '1px',
              background: '#D3D3D3',
              height: '20px',
              lineHeight: '60px',
              margin: '0 0 20px 0',
              fontFamily:'Gilroy',
              color: '#84A7B3',
              fontSize:'12px',
              fontWeight:600,
            },
          }}>
            <li>$0</li>
            <li>$250,000</li>
            <li>$500,000</li>
            <li>$750,000</li>
            <li>$1,000,000+</li>
          </ul>
          </div>
          <p css={{
            maxWidth:'620px',
            margin:'0 auto',
            textAlign:'center',
            fontSize:'14px',
          }} className={'section_title_description'}>Drag the slider around based on what do you think it will cost to repair the property;
            Move forward based on the estimated fee structure below</p>
          <div className="partial_fee_btn">
            <label>6.38%</label>
            <span>mpartial Fee</span>
          </div>
          <p>[$750 Minimum]</p>
        </div>
      </div>
    </>
  )
}
