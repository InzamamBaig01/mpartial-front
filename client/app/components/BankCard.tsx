import React, { useEffect, useContext, useState } from "react";

import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import AmericanExpress from "../../assets/American-Express.png";
import JCB from "../../assets/jcb.svg";
import discover from "../../assets/discover.png";
import remove from "../../assets/remove.svg";
import isDefaultIcon from "../../assets/is-default.svg";
import {
  setDefaultPaymentMenthod,
  getDefaultPaymentMenthod,
  deletePaymentMenthod,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

const BankCard = (props) => {
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
  const setDefault = () => {
    setLoading(true);
    setDefaultPaymentMenthod(card.paymentMethodId).subscribe((response) => {
      getMyInfo();
    });
  };

  const deletePM = () => {
    setLoading(true);
    deletePaymentMenthod(card.paymentMethodId).subscribe((response) => {
      getMyInfo();
    });
  };

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
                  <>
                    <span className="set_default_action" onClick={setDefault}>
                      {/* <span className="set_default"></span> */}
                      <span className="nondefault">Make Default</span>
                    </span>
                  </>
                )}
                <span className="remove_card" onClick={deletePM}>
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={<Tooltip id="remove">Delete</Tooltip>}
                  >
                    <img src={remove} alt="" />
                  </OverlayTrigger>
                </span>
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

export default BankCard;
