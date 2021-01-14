import React, { useEffect, useState } from "react";
import { subscriptionHistoryAD } from "utils/api-routes/api-routes.util";
import download from "assets/download.svg";
import moment from "moment";
import Loader from "app/components/Loader";

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
                    <td>${his.chargedamountincents / 100}</td>
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
              <Loader text="No history found"></Loader>
            )}
            {}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistoryAD;
