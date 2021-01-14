import React, { useEffect, useState } from "react";
import { subscriptionHistory } from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { AppAlertsContext } from "contexts/appAlertsContext";
import download from "assets/download.svg";
import moment from "moment";
import Loader from "app/components/Loader";

const TransactionHistory = () => {
  const [histories, setHistory] = useState([]);
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    showLoader();
    subscriptionHistory().subscribe((res) => {
      setHistory(res.response.data ? res.response.data : []);
      hideLoader();
    });
  };

  return (
    <>
      <table className="table">
        <tbody>
          {histories.length > 0 ? (
            histories.map((his, i) => {
              return (
                <tr key={i}>
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
            <Loader text="No transaction history found"></Loader>
          )}
          {}
        </tbody>
      </table>
    </>
  );
};

export default TransactionHistory;
