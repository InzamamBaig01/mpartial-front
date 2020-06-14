import React, { useEffect, useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import MultiSelect from "react-multi-select-component";
import { AuthContext } from "contexts/authContext";
import {
  saveOrderData,
  saveFileOrderData,
} from "utils/api-routes/api-routes.util";
import history from "../../../utils/history";
import queryString from "query-string";
import { AppContext } from "contexts/appContext";
import { AppAlertsContext } from "contexts/appAlertsContext";
import Loader from "app/components/Loader";
import { Modal } from "react-bootstrap";

import OrderFields from '../../../OrderFormFields.json';



import DrawField from './_components/DrawField';
import ApplyCoupon from './_components/ApplyCoupon';




const UserOrder = (props) => {
  const { userDetails } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

  const orderId = props.match.params.orderId;
  const [allFields, setAllFields] = useState(OrderFields);
  const { price } = useContext(AppContext);
  const [productPrice, setPrice] = useState(price);
  const [couponApplied, setCouponApplied] = useState(false);
  const [ApplyCouponShow, setApplyCouponShow] = useState(false);
  const [matchingUrl, setMatchingUrl] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [dataValues, setDataValues] = useState({});

  const top = React.createRef();
  const form = React.createRef();

  useEffect(() => {
    if (top.current) {
      window.scrollTo({ top: top.current.offsetTop, behavior: "smooth" });
      form.current.reset();
    }
  }, [top.current]);

  useEffect(() => {
    OrderFields[0].value = userDetails().emailAddress;
    setAllFields(OrderFields);
    checkFormValidation();
  }, []);

  useEffect(() => {
    checkFormValidation();
    checkMatchingUrl();
  }, [allFields]);


  const handleApplyCouponclose = () => setApplyCouponShow(false);
  const handleApplyCouponShow = () => setApplyCouponShow(true);

  const onSubmitSuccess = (couponData) => {
    handleApplyCouponclose();
    setPrice(couponData.price);
    setCouponApplied(couponData.coupon);
  };

  const uploadFiles = (id, files, index) => {
    if (files && files[index]) {
      const formData = new FormData();

      formData.append("potentiallyRelevantDigitalAssets", files[index]);

      saveFileOrderData(formData, {
        orderId: id,
      }).subscribe((response) => {
        uploadFiles(id, files, index + 1);
      });
    } else {
      hideLoader();
      history.push(`/checkout/${id}`);
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    showLoader();
    const apiData = {
      amountInCents: productPrice * 100,
      additionalFees: "",
      thetoken: localStorage.token,
    };
    let fileToUpload;
    const formData = new FormData();

    Object.keys(dataValues).map((key) => {
      if (key === "potentiallyRelevantDigitalAssets") {
        fileToUpload = dataValues[key];
      } else if (key === "temporaryActivities" || key == "specialtyTradeSelection") {
        apiData[key] = dataValues[key] ? dataValues[key].map((v) => { return v.value; }) : "";
      } else {
        apiData[key] = dataValues[key];
      }
    });

    // console.log(apiData);

    const stringified = queryString.stringify(apiData);

    saveOrderData(formData, stringified).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          localStorage.setItem("sessipn", response.response.message);
          uploadFiles(response.response.data.id, fileToUpload, 0);
        } else {
          hideLoader();
        }
      },
      (response) => {
      }
    );
  };

  // const checkRequiredFieldsValue = () => {
  //   let invalid = false;
  //   allFields.map((field) => {
  //     if (field.required) {
  //       if (field.value && field.value.length) {
  //       } else {
  //         invalid = true;
  //       }
  //     }
  //   });
  //   return invalid;
  // };
  const checkFormValidation = () => {
    if (form && form.current) {
      setSubmitBtnDisabled(!form.current.checkValidity());
    }
  };

  const checkMatchingUrl = () => {
    const firstUrl = allFields.filter((field) => {
      return field.id == "preMitigationDemoModelURL";
    });
    const secondUrl = allFields.filter((field) => {
      return field.id == "postMitigationDemoModelURL";
    });

    if (firstUrl[0].value && secondUrl[0].value) {
      const isMatch = firstUrl[0].value == secondUrl[0].value;
      if (!submitBtnDisabled) setSubmitBtnDisabled(isMatch ? true : false);
      setMatchingUrl(isMatch);
    }
  };

  const handleChange = (field, value) => {
    checkFormValidation();
    setDataValues({
      ...dataValues,
      [field.id]: value
    })

    let fieldsData = Object.assign([], allFields);
    fieldsData = fieldsData.map((f) => {
      if (f.id == field.id) {
        f.value = value;
      }
      return f;
    });
    setAllFields(fieldsData);
  };



  const saveToDraft = () => {
    showLoader();
    const apiData = {
      amountInCents: productPrice * 100,
      additionalFees: "",
      thetoken: localStorage.token,
    };
    let fileToUpload;
    const formData = new FormData();

    allFields.map((field) => {
      if (field.type === "multipleAttachment") {
        fileToUpload = field.value;
      } else if (field.type === "multiSelect") {
        apiData[field.id] = field.value
          ? field.value.map((v) => {
            return v.value;
          })
          : "";
      } else {
        apiData[field.id] = field.value;
      }
    });


    const stringified = queryString.stringify(apiData);

    return false;

    saveOrderData(formData, stringified).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          localStorage.setItem("sessipn", response.response.message);
          uploadFiles(response.response.data.id, fileToUpload, 0);
        } else {
          hideLoader();
        }
      },
      (response) => {
      }
    );
  }

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center" ref={top}>
          mpartial Engine
        </h1>
        <div className="container">
          <form className="order_form" onSubmit={onSubmit} ref={form}>
            <div className="row">
              {allFields.map((field, index) => {
                const gridCol =
                  (index > 3 && index < 8) || index == 10 || index == 11
                    ? "col-6 select_box_field"
                    : "col-12";
                return (
                  <div className={`form-group ${gridCol}`} key={index}>
                    <label>
                      {field.name}{" "}
                      {field.required ? <span className="red">*</span> : ""}
                    </label>
                    <div
                      className={`description small_${
                        field.id != "projectZipCode" &&
                        field.description?.length <= 42
                        }
                        small_${(field.id == "temporaryActivities" || field.id == "projectZipCode") ? "xs" : ""}
                        `}
                    >
                      {field.description}
                    </div>
                    <DrawField
                      field={field}
                      onChange={handleChange}
                      matchingUrl={matchingUrl}
                    ></DrawField>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <label>Price</label>
              <div className="row">
                <div className="col-3">
                  {
                    couponApplied.length ? (
                      <>
                        <div className="form_price">${productPrice} <sup>${price} </sup></div>
                      </>
                    ) : (
                        <div className="form_price">${productPrice}</div>
                      )
                  }
                </div>
                <div className="col">
                  <div className="pull-right">
                    {
                      couponApplied.length ? (
                        <>
                          <span className="coupon_success">
                            Coupon Applied: {couponApplied}
                          </span>
                        </>
                      ) : (
                          <button className="btn mt-2" onClick={handleApplyCouponShow}>Apply Coupon</button>
                        )
                    }
                  </div>
                </div>
              </div>

            </div>

            <div className="form-group">
              <label className="terms">
                <input type="checkbox" required onClick={handleChange} /> I’ve
                read and accept the mpartial{" "}
                <Link to="/terms">
                  <span className="underline">Terms & Conditions</span>
                </Link>
                <span className="red">*</span>
              </label>
            </div>
            <div className="form-group submit_btn_container">
              <button
                className="btn btn-green"
                type="submit"
                onClick={checkFormValidation}
                id="formButton"
                disabled={submitBtnDisabled}
              >
                <Loader text="Proceed to Checkout"></Loader>
              </button>
              {
                !orderId && <button
                  className="btn btn-green savetodrafts"
                  type="button"
                  onClick={saveToDraft}
                  id="formButton"

                >
                  <Loader text="Save as draft"></Loader>
                </button>
              }

            </div>
          </form>
        </div>
      </div>
      {ApplyCouponShow && (
        <ApplyCoupon
          value={""}
          onSubmitSuccess={onSubmitSuccess}
          show={ApplyCouponShow}
          handleClose={handleApplyCouponclose}
          info={{}}
        />
      )}
    </>
  );
};

export default withRouter(UserOrder);
