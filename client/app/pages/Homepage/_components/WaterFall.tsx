import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import SectionTitle from 'app/components/SectionTitle';
import Slider from '../../../../utils/react-rangeslider/';
import { css } from 'emotion';

interface WaterFallProps {

}
const priceRanges = [
  {
    "from": 950001,
    "to": 1000000,
    "value": "4.70"
  },
  {
    "from": 900001,
    "to": 950000,
    "value": "4.98"
  },
  {
    "from": 850001,
    "to": 900000,
    "value": "5.12"
  },
  {
    "from": 800001,
    "to": 850000,
    "value": "5.26"
  },
  {
    "from": 750001,
    "to": 800000,
    "value": "5.40"
  },
  {
    "from": 700001,
    "to": 750000,
    "value": "5.54"
  },
  {
    "from": 650001,
    "to": 700000,
    "value": "5.68"
  },
  {
    "from": 600001,
    "to": 650000,
    "value": "5.82"
  },
  {
    "from": 550001,
    "to": 600000,
    "value": "5.96"
  },
  {
    "from": 500001,
    "to": 550000,
    "value": "6.10"
  },
  {
    "from": 450001,
    "to": 500000,
    "value": "6.24"
  },
  {
    "from": 400001,
    "to": 450000,
    "value": "6.38"
  },
  {
    "from": 350001,
    "to": 400000,
    "value": "6.52"
  },
  {
    "from": 300001,
    "to": 350000,
    "value": "6.66"
  },
  {
    "from": 250001,
    "to": 300000,
    "value": "6.80"
  },
  {
    "from": 200001,
    "to": 250000,
    "value": "6.94"
  },
  {
    "from": 150001,
    "to": 200000,
    "value": "7.08"
  },
  {
    "from": 100001,
    "to": 150000,
    "value": "7.22"
  },
  {
    "from": 50001,
    "to": 100000,
    "value": "7.36"
  },
  {
    "from": 0,
    "to": 50000,
    "value": "7.50"
  }
];

export const WaterFall: React.FC<WaterFallProps> = ({ }) => {

  const [volume, setVolume] = React.useState(0);
  const [commission, setCommission] = React.useState("0");

  const onChangeRange = (v) => {
    setVolume(v);
    priceRanges.map(priceRange => {
      if (v >= priceRange.from && v <= priceRange.to) {
        setCommission(priceRange.value);
      }
    })
  }

  return (
    <>
      <div className="mpartial_section" css={{ backgroundColor: '#FFFFFF', justifyContent: 'center', textAlign: 'center', color: '#0A5169', paddingBottom: '20px' }}>
        <div className="container">
          <SectionTitle
            title={"mpartial Waterfall Fee Structure"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className="slider" css={{ margin: '80px 0 50px' }}>
            <Slider
              min={0}
              max={1000000}
              tooltip={true}
              alwaysShowTooltip={true}
              step={50000}
              value={volume}
              format={(v) => {
                return (
                  <>
                    <div className="slider_tooltip_price">${v}</div>
                    <div className="slider_tooltip_text">Estimate Grand Total</div>
                  </>
                )
              }}
              oriientation={'vertical'}
              onChange={onChangeRange}
            />
            <ul css={{
              listStyle: 'none',
              padding: '0 0 0 15px',
              display: 'flex',
              justifyContent: 'space-between',
              'li': {
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                width: '1px',
                background: '#D3D3D3',
                height: '20px',
                lineHeight: '60px',
                margin: '0 0 20px 0',
                fontFamily: 'Gilroy',
                color: '#84A7B3',
                fontSize: '12px',
                fontWeight: 600,
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
            maxWidth: '620px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '14px',
          }} className={'section_title_description'}>Drag the slider around based on what do you think it will cost to repair the property;
            Move forward based on the estimated fee structure below</p>
          <div className="partial_fee_btn">
            <label>{commission}%</label>
            <span>mpartial Fee</span>
          </div>
          <p>[$750 Minimum]</p>
        </div>
      </div>
    </>
  )
}
