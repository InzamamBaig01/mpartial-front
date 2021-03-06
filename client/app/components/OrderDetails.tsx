import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";

import OrderFields from "../../OrderFormFields.json";
import { delDraft } from "utils/api-routes/api-routes.util";
import history from "../../utils/history";

const Delete = (props) => {
  const [status, setStatus] = useState();

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
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="modals"
        delete={props.delete}
      >
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Are you sure you want to delete this draft?</h3>
            </div>

            <div className="popup-btn">
              <button
                className=" btn"
                type="submit"
                id="formButton"
                onClick={props.handleClose}
              >
                Cancel
              </button>

              <a href="">
                <button
                  className=" btn"
                  type="submit"
                  id="formButton"
                  onClick={props.delete}
                >
                  Confirm
                </button>
              </a>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const OrderDetails = (props) => {
  const [order, setOrder] = useState(props.order);
  const { getMyInfo, myInfo } = useContext(AppContext);

  const [editStatusShow, setEditStatusShow] = useState(false);

  const handleEditStatusclose = () => setEditStatusShow(false);
  const handleEditStatusShow = () => setEditStatusShow(true);

  const onSubmitStatusSuccess = () => {
    handleEditStatusclose();
    getADOrderById(order.id);
  };

  useEffect(() => {
    getMyInfo();
  }, []);
  console.log("info", myInfo);
  useEffect(() => {
    if (props.order) {
      console.log("props", props.order);
      setOrder(props.order);
    }
    localStorage.setItem("sessipn", "sessipn");
  }, [props.order]);
  // fields.sort((a, b) => {
  //     return a.type > b.type;
  // });

  const DrawFieldData = (props) => {
    let Data;
    switch (props.field.type) {
      case "multiSelect":
        Data = () => {
          return (
            <>
              <ul className="order_detail_list">
                {props.order[props.field.id].map((d) => (
                  <li>{d}</li>
                ))}
              </ul>
            </>
          );
        };
        break;

      case "multipleAttachment":
        Data = () => {
          return (
            <>
              {props.order[props.field.id].length
                ? props.order[props.field.id].map((d, index) => (
                    <a href={d} target="_blank" download>
                      {props.order.potentiallyRelevantDigitalAssetsRealNames[
                        index
                      ].replace(/\.[^/.]+$/, "")}
                    </a>
                  ))
                : "Not Available"}
            </>
          );
        };
        break;
      case "url":
        Data = () => {
          return (
            <>
              {props.order[props.field.id] ? (
                <>
                  <a href={props.order[props.field.id]} target="_blank">
                    {props.order[props.field.id]}
                  </a>
                </>
              ) : (
                "Not Available"
              )}
            </>
          );
        };
        break;
      
      default:
        Data = () => {
          return (
            <>
              {props.order[props.field.id]
                ? props.order[props.field.id]
                : "Not Available"}
            </>
          );
        };
        break;
    }
    return (
      <>
        <Data></Data>
      </>
    );
  };

  const deleteDraft = () => {
    delDraft({ id: order.id }).subscribe((res) => {
      history.push("/orders");
    });
  };

  return (
    <>
      {order ? (
        <div className="order_details ">
          <div className="order_details_header">
            Project Name: {order.projectName}
          </div>

          <div className="order_form order_details_info">
            <div className="row">
              {OrderFields.map((field, index) => {
                const gridCol =
                  (index > 3 && index < 8) || index == 10 || index == 11
                    ? "col-6 select_box_field"
                    : "col-12";
                return (
                  <div className={`form-group ${gridCol}`} key={index}>
                    <label className="details_vew_list">
                      {field.name}{" "}
                      {field.required ? <span className="red">*</span> : ""}
                    </label>
                    <br />
                    <div className="order_details_value">
                      <DrawFieldData
                        order={order}
                        field={field}
                      ></DrawFieldData>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="">
              <div className={`form-group `}>
                <label className="details_vew_list">Price Details</label>
                <br />
                <div className="order_details_value">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tr>
                      <td>Mpartial Deposit</td>
                      <td className="text-center">
                        ${order.orignalprice / 100}
                      </td>
                    </tr>

                    {order.couponapplied ? (
                      <>
                        <tr>
                          <td>Coupon Adjustment: ({order.couponapplied}) </td>
                          <td className="text-center">
                            -${order.amountsubtraced / 100}
                          </td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td className="text-center">
                            ${order.amountInCents / 100}
                          </td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                  </table>
                </div>
              </div>
              {/* {fields.map((field) => {
              return (
                <div className={`col-md-4 col-sm-6 col-xs-6 field_${field.type}`}>
                  <label>{field.name}</label>
                  <div className="order_details_value">
                    <DrawFieldData
                      order={order}
                      field={field}
                    ></DrawFieldData>
                  </div>
                </div>
              );
            })} */}
            </div>
          </div>
          <div className="order_details_footer">
            <div className="row row-resp">
              <div className="col col-resp">
                <Link to={props.isAdmin ? `/allorders` : `/orders`}>
                  <button className="btn">Back</button>
                </Link>
              </div>
              <div className="row text-right">
                {order.paymentStatus == "DRAFT" && (
                  <>
                    {props.order.emailForDeliveryOfResults ===
                    myInfo.emailAddress ? (
                      <div className="col col-resp">
                        <button className="btn " onClick={handleEditStatusShow}>
                          Delete Draft
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {props.order.emailForDeliveryOfResults ===
                    myInfo.emailAddress ? (
                      <div className="col col-resp">
                        <Link to={`/order/${order.id}`}>
                          <button className="btn">Load Draft</button>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {order.paymentStatus == "UNPAID" && (
                  <Link to={`/checkout/${order.id}`}>
                    <button className="btn">Pay Now</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {editStatusShow && (
        <Delete
          value={""}
          onChange={() => {}}
          onEditStatusSuccess={onSubmitStatusSuccess}
          onStackSubmit={() => {}}
          show={editStatusShow}
          handleClose={handleEditStatusclose}
          delete={() => {
            delDraft({ id: order.id }).subscribe((res) => {
              history.push("/orders");
            });
          }}
        />
      )}
    </>
  );
};

export default OrderDetails;
