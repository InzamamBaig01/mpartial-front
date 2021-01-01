import React, { useEffect, useState } from "react";
import { subscriptionHistoryAD } from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { Badge } from "react-bootstrap";
import download from "assets/download.svg";
import moment from "moment";

const TransactionHistoryAD = (props) => {
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
      <div
        className="payment_section_body transaction_history"
        style={{ height: "348px !important" }}
      >
        <table className="table">
          <tbody>
            {histories.length > 0 ? (
              histories.map((his) => {
                return (
                  <tr>
                    <td>{moment(his.createdAt).format("MMM DD - YYYY")}</td>
                    <td>${his.amountincents / 100}</td>
                    <td>{his.status == "Succeeded" ? "Paid" : his.status}</td>
                    <td>
                      {his.recipturl != null && (
                        <a target="_blank" href={his.recipturl}>
                          <img src={download} className="download_link" />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <h4>No history found</h4>
            )}
            {}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistoryAD;
