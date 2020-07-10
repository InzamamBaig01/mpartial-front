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
import leftarrow from "../../../assets/first.svg";
import OrderFields from "../../../OrderFormFields.json";

import rightarrowdark from "../../../assets/up-arrow-white.svg";
import saveImage from "../../../assets/save.svg"
import DrawField from "./_components/DrawField";
import ApplyCoupon from "./_components/ApplyCoupon";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";

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
  const { getMyOrders, myOrders } = useContext(AppContext);

  const [order, setOrder] = useState(false);

  const top = React.createRef();
  const form = React.createRef();

  useEffect(() => {
    if (top.current) {
      window.scrollTo({ top: top.current.offsetTop, behavior: "smooth" });
      form.current.reset();
    }
  }, [top.current]);

  useEffect(() => {
    // showLoader();
    checkFormValidation();
    if (orderId) {
      getMyOrders();
    } else {
      console.clear();
      console.log("loaded")
      const userOrderFormFeilds = Object.assign([], OrderFields);
      userOrderFormFeilds.map(field => {
        field.value = "";
        if (field.id == "emailForDeliveryOfResults") field.value = userDetails().emailAddress;
        return field;
      })

      setDataValues({
        ...dataValues,
        emailForDeliveryOfResults: userDetails().emailAddress,
      });
      setAllFields(userOrderFormFeilds);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      getMyOrders();
    } else {
      console.log("loaded 2")
      const userOrderFormFeilds = Object.assign([], OrderFields);
      userOrderFormFeilds.map(field => {
        field.value = "";
        if (field.id == "emailForDeliveryOfResults") field.value = userDetails().emailAddress;
        return field;
      })

      setDataValues({
        ...dataValues,
        emailForDeliveryOfResults: userDetails().emailAddress,
      });
      setAllFields(userOrderFormFeilds);
      form.current.reset();
    }
  }, [orderId])

  useEffect(() => {
    if (order) {
      const dataV = {};
      const fields = allFields.map((field) => {
        field.value = order[field.id] ? order[field.id] : "";
        dataV[field.id] = order[field.id] ? order[field.id] : "";
        return field;
      });
      setAllFields(fields);
      setDataValues(dataV);
      setSubmitBtnDisabled(true);

    }
  }, [order]);

  useEffect(() => {
    if (orderId && myOrders) {
      const selectedOrder = myOrders.filter((ord) => {
        return ord.id == orderId;
      });
      setOrder(selectedOrder.length ? selectedOrder[0] : false);
    }
  }, [myOrders]);

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
      saveAsDraft: false,
    };
    if (orderId) apiData["orderId"] = orderId;
    let fileToUpload = [];
    const formData = new FormData();

    Object.keys(dataValues).map((key) => {
      if (key === "potentiallyRelevantDigitalAssets") {
        fileToUpload = dataValues[key];
      } else if (
        key === "temporaryActivities" ||
        key == "specialtyTradeSelection"
      ) {
        apiData[key] = dataValues[key]
          ? dataValues[key].map((v) => {
            return v.value;
          })
          : "";
      } else {
        apiData[key] = dataValues[key];
      }
    });

    // console.log(apiData);

    const stringified = queryString.stringify(apiData);

    saveOrderData(formData, stringified).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          localStorage.setItem("sessipn", response.response.Message);
          if (fileToUpload.length) {
            uploadFiles(
              response.response.data
                ? response.response.data.id
                : response.response.Message,
              fileToUpload,
              0
            );
          } else {
            hideLoader();
            history.push(`/checkout/${response.response.Message}`);
          }
        } else {
          hideLoader();
        }
      },
      (response) => { }
    );
  };

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
      [field.id]: value,
    });
    let fieldsData = Object.assign([], allFields);c
    fieldsData = fieldsData.map((f) => {
      if (f.id == field.id) {
        const cop = Object.assign({},f);
        cop['value'] = value;
        return cop;
      }
      return f;
    });

    setAllFields(fieldsData);
  };

  const saveToDraft = (e) => {
    e.preventDefault();
    // if (e.currentTarget.tagName == "SPAN") return false;2u
    showLoader();
    const apiData = {
      amountInCents: productPrice * 100,
      additionalFees: "",
      thetoken: localStorage.token,
      saveAsDraft: true,
    };
    if (orderId) apiData["orderId"] = orderId;

    let fileToUpload;
    const formData = new FormData();

    Object.keys(dataValues).map((key) => {
      if (key === "potentiallyRelevantDigitalAssets") {
        fileToUpload = dataValues[key];
      } else if (
        key === "temporaryActivities" ||
        key == "specialtyTradeSelection"
      ) {
        apiData[key] = dataValues[key]
          ? dataValues[key].map((v) => {
            return v.value;
          })
          : "";
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
          if (fileToUpload) {
            hideLoader();
            history.push(`/orders/`);
            // TODO:// API change Required.
            // uploadFiles(response.response.data.id, fileToUpload, 0);
          } else {
            hideLoader();
            history.push(`/orders/`);
          }
        } else {
          hideLoader();
        }
      },
      (response) => { }
    );
  };
  const [saveBtn, setSaveBtn] = useState(false);
  const [checkoutAs, setCheckoutAs] = useState("checkout");
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
                        small_${
                        field.id == "temporaryActivities" ||
                          field.id == "projectZipCode"
                          ? "xs"
                          : ""
                        }
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
                  {couponApplied.length ? (
                    <>
                      <div className=" main_price">
                        ${productPrice} <sup>${price} </sup>
                      </div>
                    </>
                  ) : (
                      <div className=" main_price">${productPrice}</div>
                    )}
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
              <ButtonGroup>
                <Button
                  className="btn btn-green "
                  type="submit"
                  onClick={checkFormValidation}
                  id="formButton"
                  disabled={checkoutAs == "checkout" && submitBtnDisabled}
                >
                  <Loader
                    text={
                      checkoutAs == "checkout"
                        ? "Proceed to Checkout"
                        : "Save as draft"
                    }
                  ></Loader>
                </Button>
                {/* <UncontrolledButtonDropdown className="btn-dropdown">
                  <DropdownToggle caret>
                    <img src={rightarrowdark} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={saveToDraft}>
                      Save as draft
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown> */}
              </ButtonGroup>

              <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                Save as draft
      </UncontrolledTooltip>
              <button className="floating_draft_btn" id="UncontrolledTooltipExample" onClick={saveToDraft}>

                <Loader
                  text={
                    (<img src={saveImage} />)
                  }
                ></Loader>

              </button>

              {/* {
                !orderId && <button
                  className="btn btn-green savetodrafts"
                  type="button"
                  id="formButton"

                >
                  <img src={leftarrow} />
                  <Loader text="Save as draft" onClick={saveToDraft}></Loader>
                </button>
              } */}

              {/* <FloatingMenu
                slideSpeed={500}
                direction="right"
                spacing={8}
                isOpen={saveBtn}
                className="orderoptions"
              >
                <MainButton
                  iconResting={<img src={rightarrowdark} />}
                  iconActive={<img src={rightarrowdark} />}
                  backgroundColor="black"
                  onClick={() => setSaveBtn(!saveBtn)}
                  size={56}
                />
                <ChildButton
                  icon={<button
                    className="btn btn-green"
                    type="submit"
                    onClick={checkFormValidation}
                    id="formButton"
                    disabled={submitBtnDisabled}
                  >
                    <Loader text="Proceed to Checkout"></Loader>
                  </button>}
                  type="submit"

                  size={210}
                  // onClick={(e) => { form.current.submit(); checkFormValidation }}
                // onClick={() => console.log('First button clicked')}
                />
                <ChildButton
                  icon={<button
                    className="btn btn-green"
                    type="button"
                    id="formButton"
                  >
                    <Loader text="Save As Draft"></Loader>
                  </button>}
                  type="submit"
                  // onClick={(e) => { form.current.submit(); checkFormValidation }}
                  size={210}
                />
              </FloatingMenu>
            */}

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
