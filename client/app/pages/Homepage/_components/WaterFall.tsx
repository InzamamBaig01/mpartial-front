import * as React from "react";
import SectionTitle from "app/components/SectionTitle";
import Slider from "../../../../utils/react-rangeslider/";
import { OverlayTrigger, Popover } from "react-bootstrap";

interface WaterFallProps {}
const priceRanges = [
  {
    from: 950001,
    to: 1000000,
    value: "3.00",
  },
  {
    from: 900001,
    to: 950000,
    value: "3.24",
  },
  {
    from: 850001,
    to: 900000,
    value: "3.3",
  },
  {
    from: 800001,
    to: 850000,
    value: "3.42",
  },
  {
    from: 750001,
    to: 800000,
    value: "3.51",
  },
  {
    from: 700001,
    to: 750000,
    value: "3.60",
  },
  {
    from: 650001,
    to: 700000,
    value: "3.69",
  },
  {
    from: 600001,
    to: 650000,
    value: "3.78",
  },
  {
    from: 550001,
    to: 600000,
    value: "3.87",
  },
  {
    from: 500001,
    to: 550000,
    value: "3.97",
  },
  {
    from: 450001,
    to: 500000,
    value: "4.06",
  },
  {
    from: 400001,
    to: 450000,
    value: "4.15",
  },
  {
    from: 350001,
    to: 400000,
    value: "4.24",
  },
  {
    from: 300001,
    to: 350000,
    value: "4.33",
  },
  {
    from: 250001,
    to: 300000,
    value: "4.42",
  },
  {
    from: 200001,
    to: 250000,
    value: "4.51",
  },
  {
    from: 150001,
    to: 200000,
    value: "4.60",
  },
  {
    from: 100001,
    to: 150000,
    value: "4.69",
  },
  {
    from: 50001,
    to: 100000,
    value: "4.78",
  },
  {
    from: 0,
    to: 50000,
    value: "4.85",
  },
];

const WaterFall: React.FC<WaterFallProps> = ({}) => {
  const [volume, setVolume] = React.useState(150000);
  const [commission, setCommission] = React.useState("7.22");

  const onChangeRange = (v) => {
    setVolume(v);
    priceRanges.map((priceRange) => {
      if (v >= priceRange.from && v <= priceRange.to) {
        setCommission(priceRange.value);
      }
    });
  };

  const convertToStr = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
      : Math.abs(Number(labelValue));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <p className="popver_text">
          Fee Structure Example: An estimate grand total of $100k will result in
          a fee of $4,784. The $750 deposit will be collected upon submission
          and applied toward the overarching fee.
        </p>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <div
        className="mpartial_section"
        css={{
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          textAlign: "center",
          color: "#0A5169",
          paddingBottom: "20px",
        }}
      >
        <div className="container">
          <SectionTitle
            title={""}
            title2={"Waterfall Fee Structure"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className="slider" css={{ margin: "80px 0 50px" }}>
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
                    <div className="slider_tooltip_price">
                      ${convertToStr(v)}
                    </div>
                    <div className="slider_tooltip_text">
                      Estimate Grand Total
                    </div>
                  </>
                );
              }}
              oriientation={"vertical"}
              onChange={onChangeRange}
            />
            <ul
              css={{
                listStyle: "none",
                padding: "0 15px 0 15px",
                display: "flex",
                justifyContent: "space-between",
                li: {
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "1px",
                  background: "#D3D3D3",
                  height: "20px",
                  lineHeight: "60px",
                  margin: "0 0 20px 0",
                  fontFamily: "Gilroy",
                  color: "#84A7B3",
                  fontSize: "12px",
                  fontWeight: 600,
                },
              }}
            >
              <li>$0</li>
              <li>$250,000</li>
              <li>$500,000</li>
              <li>$750,000</li>
              <li>$1M+</li>
            </ul>
          </div>
          <p
            css={{
              maxWidth: "620px",
              margin: "0 auto",
              textAlign: "center",
              fontSize: "14px",
            }}
            className={"section_title_description"}
          >
            Drag the slider around based on what you think it will cost to
            repair the property. <br />
            Move forward based on the estimated fee structure below.
          </p>
          <div className="partial_fee_btn">
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <i className="info_popup">i</i>
            </OverlayTrigger>
            <label>{commission}%</label>
            <span>mpartial Fee</span>
          </div>
          <p className="waterfall_info_text">[$750 Minimum]</p>
        </div>
      </div>
    </>
  );
};

export default WaterFall;
