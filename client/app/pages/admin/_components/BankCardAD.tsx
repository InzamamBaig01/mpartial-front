import React, { useEffect, useContext, useState } from "react";

import visa from "../../../../assets/visa.png";
import mastercard from "../../../../assets/mastercard.png";
import AmericanExpress from "../../../../assets/American-Express.png";
import JCB from "../../../../assets/jcb.svg";
import discover from "../../../../assets/discover.png";
import remove from "../../assets/remove.svg";
import isDefaultIcon from "../../../../assets/is-default.svg";
import { getDefaultPaymentMenthod } from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

const BankCardAD = (props) => {
  const { getMyInfo } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const pmicons = {
    mastercard: mastercard,
    jcb: JCB,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };
  const [card, setCard] = useState(props.card);
  // card.isDefault = false;
  useEffect(() => {
    setCard(props.card);
    setLoading(false);
  }, [props.card]);

  return (
    <>
      <div className={`card_item card_is_default_${card.isDefault}`}>
        <div className="row">
          <div className="col text-left">
            <img src={pmicons[card.brand]} className="brand_icon" alt="" />
          </div>
          <div className={`col text-right card_status`}>
            {loading ? (
              <div className={`loader show_${loading}`}></div>
            ) : (
              <>
                {card.isDefault ? (
                  <>
                    <img src={isDefaultIcon} alt="" />{" "}
                    <span className="default">Default</span>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card_number"> **** **** **** {card.last4}</div>
          </div>
        </div>
        <div className="row">
          <div className="col text-left">
            <label className="text-left">Name</label>
            <div className="info_text text-left">{card.billingDetailName}</div>
          </div>
          <div className="col text-right">
            <label>Valid Until</label>
            <div className="info_text">
              {card.exp_month}/{card.exp_year}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankCardAD;
