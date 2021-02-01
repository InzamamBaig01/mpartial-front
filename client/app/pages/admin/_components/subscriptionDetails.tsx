import React, { useEffect, useState } from "react";
import { subscriptionHistoryAD } from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { Badge } from "react-bootstrap";
import download from "assets/download.svg";
import moment from "moment";

const SubscriptionDetails = (props) => {
  const [histories, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    subscriptionHistoryAD(props.email).subscribe((res) => {
      setHistory(res.response.data ? res.response.data : []);
    });
  };

  return (
    <>
      {histories.length > 0 ? (
        <div className="packages" style={{ padding: "30px 30px" }}>
          <div className="row align-items-center">
            <div className="col-lg-8 col-xs-12 text-left d-flex align-items-center">
              <span
                className="h3"
                style={{
                  fontStyle: "bold",
                  paddingRight: "5px",
                }}
              >
                {histories[0].planname}
              </span>
              {props.subscriptionstatus === "Cancelled" ? (
                <Badge className="cancelled_badge">
                  <p>Cancelled</p>
                </Badge>
              ) : props.subscriptionstatus === "Active" ? (
                <Badge className="active_badge">
                  <p>Active</p>
                </Badge>
              ) : props.subscriptionstatus === "PausedDueToPaymentFailure" ? (
                <Badge variant="Warning">Paused</Badge>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-4 col-xs-12 text-right d-flex align-items-center justify-content-end">
              <h3> ${histories[0].chargedamountincents / 100}</h3>
              {/* <span className="interval">/{filteredPlan[0].intervalUnit}</span> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 d-flex" style={{ paddingLeft: "0" }}>
              <div className="col-lg-6 text-left d-flex flex-column mt-2 justify-content-end">
                <p style={{ marginBottom: "0" }} className="faded">
                  Subscription Date
                </p>

                <p
                  style={{
                    marginBottom: "0",
                    fontWeight: "600",
                  }}
                >
                  {moment(histories[0].createdAt).format("MMM DD - YYYY")}
                </p>
              </div>
              <div className="col-lg-6 text-left d-flex flex-column mt-2 justify-content-end">
                <p style={{ marginBottom: "0" }} className="faded">
                  Next Billing Date
                </p>
                {props.subscriptionstatus === "Active" ? (
                  <p
                    style={{
                      marginBottom: "0",
                      fontWeight: "600",
                    }}
                  >
                    {moment(histories[0].nextbillingdate).format(
                      "MMM DD - YYYY"
                    )}
                  </p>
                ) : (
                  <p
                    style={{
                      marginBottom: "0",
                      fontWeight: "600",
                    }}
                  >
                    N/A
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SubscriptionDetails;
