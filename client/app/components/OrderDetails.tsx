import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";

import OrderFields from '../../OrderFormFields.json';


const OrderDetails = (props) => {

  const [order, setOrder] = useState(props.order);

  console.log(order);
  useEffect(() => {
    if (props.order) {
      setOrder(props.order)
    }
    localStorage.setItem("sessipn", "sessipn");
  }, [props.order])
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
              {props.order[props.field.id].map((d, index) => (
                <a href={d} target="_blank" download>
                  Asset {index + 1}
                </a>
              ))}
            </>
          );
        };
        break;
      case "url":
        Data = () => {
          return (
            <>
              {props.order[props.field.id]
                ? (
                  <>
                    <a href={props.order[props.field.id]} target="_blank" >
                      {props.order[props.field.id]}
                    </a>
                  </>
                )
                : "Not Available"}
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


  return (
    <>


      {order ? (
        <div className="order_details ">
          <div className="order_details_header">Project Name: {order.projectName}</div>

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
              <div className={`form-group `} >
                <label className="details_vew_list">
                  Price Details
                    </label>
                <br />
                <div className="order_details_value">
                  
                  <table className="table">
                          <tr>
                            <td>Price: </td>
                            <td className="text-center">${order.amountInCents / 100}</td>
                          </tr>
                        </table>
                  {
                    order.coupenapplied ? (
                      <>                         
                        <table className="table">
                          <tr>
                            <td>Coupon Code: </td>
                            <td>{order.coupenapplied}</td>
                          </tr>
                          <tr>
                            <td>mpartial Price: </td>
                            <td>${order.orignalprice / 100}</td>
                          </tr>
                          <tr>
                            <td>You Saved: </td>
                            <td>${order.amountsubtraced / 100}</td>
                          </tr>
                        </table>
                      </>
                    ) : ""
                  }
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
            <div className="row">
              <div className="col">
                <Link to={props.isAdmin ? `/allorders` : `/orders`}>
                  <button className="btn">Back</button>
                </Link>
              </div>
              <div className="col text-right">
                {
                  order.paymentStatus == "DRAFT" && <Link to={`/order/${order.id}`}>
                    <button className="btn">Load Draft</button>
                  </Link>

                }
                {
                  order.paymentStatus == "UNPAID" && <Link to={`/checkout/${order.id}`}>
                    <button className="btn">Pay Now</button>
                  </Link>

                }
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

export default OrderDetails;

