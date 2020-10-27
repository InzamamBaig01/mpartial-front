import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
import OrderDetailsAdmin from "app/components/OrderDetailsAdmin";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { updateStatus } from "utils/api-routes/api-routes.util";

const EditStatus = (props) => {
  const [status, setStatus] = useState(
    props.info.paymentStatus == "PAID"
      ? "Deposit Paid"
      : props.info.paymentStatus
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    updateStatus({
      orderId: props.info.id,
      orderStatus: status,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onEditStatusSuccess();
      }
    });
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="Add_card">
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                className="form-control status_select"
                required
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value)}
              >
                <option value="Deposit Paid">Deposit Paid</option>
                <option value="Balance Due">Balance Due</option>
                <option value="Fully Paid">Fully Paid</option>
              </select>
            </div>
            <div className="form-group">
              <button
                className="btn"
                type="submit"
                id="formButton"
                disabled={status.length == 0}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const AdminOrderDetails = (props) => {
  const { getADOrderById, singleADOrderDetails } = useContext(AppContext);

  const orderid = props.match.params.orderid;
  const [order, setOrder] = useState(false);
  const [editStatusShow, setEditStatusShow] = useState(false);
  const [Loading, setLoading] = useState(true);
  const handleEditStatusclose = () => setEditStatusShow(false);
  const handleEditStatusShow = () => setEditStatusShow(true);

  useEffect(() => {
    getADOrderById(orderid);
  }, []);

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (singleADOrderDetails) {
      setOrder(singleADOrderDetails);
    }
  }, [singleADOrderDetails]);

  const onSubmitStatusSuccess = () => {
    handleEditStatusclose();
    getADOrderById(orderid);
  };

  return (
    <>
      <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
      <div className="other_pages_container">
        <div className={"admin-order-wrap"}>
          <AdminSidebar></AdminSidebar>

          <section>
            <div className={"section-head"}>
              <div>{/* <h2>Orders</h2> */}</div>
              <div>
                <div className="text-right">
                  <button
                    className="btn btn-block"
                    onClick={handleEditStatusShow}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
            {loading ? (
              <img
                src={require("../../../assets/loader.gif")}
                alt="loading..."
                style={{
                  position: "absolute",
                  height: "100px",
                  width: "100px",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-50px",
                  marginTop: "-50px",
                }}
              />
            ) : (
              ""
            )}
            <OrderDetailsAdmin order={order} isAdmin={true} />
          </section>
        </div>
      </div>
      {editStatusShow && (
        <EditStatus
          value={""}
          onEditStatusSuccess={onSubmitStatusSuccess}
          show={editStatusShow}
          handleClose={handleEditStatusclose}
          info={order}
        />
      )}
    </>
  );
};

export default withRouter(AdminOrderDetails);
