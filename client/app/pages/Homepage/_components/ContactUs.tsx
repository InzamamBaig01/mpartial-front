import * as React from "react";
import { withRouter, Link } from "react-router-dom";
import SectionTitle from "app/components/SectionTitle";
import { AppAlertsContext } from "contexts/appAlertsContext";
import InputMask from "react-input-mask";
import { sendEmail, resetPassword } from "utils/api-routes/api-routes.util";
import { useState } from "react";
import Loader from "app/components/Loader";
interface ConatctUsProps {}
export const ContactUs: React.FC<ConatctUsProps> = ({}) => {
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [messageDone, setMessageDone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    showLoader();
    setMessageDone(false);
    sendEmail({
      yourname: contactDetails.name,
      email: contactDetails.email,
      phonenumber: contactDetails.phone,
      message: contactDetails.message,
    }).subscribe((response) => {
      setMessageDone(true);
      setContactDetails({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      hideLoader();
    });
  };

  const onchange = (value, key) => {
    const details = Object.assign({}, contactDetails);
    details[key] = value;
    setContactDetails(details);
  };
  return (
    <>
      <div
        className="mpartial_section contact_us"
        css={{
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          textAlign: "center",
          color: "#0A5169",
          padding: " 0",
        }}
      >
        <div className={"container"}>
          <SectionTitle
            title={"Contact Us"}
            description={""}
            type="center"
          ></SectionTitle>
          <div className={"form-holder"}>
            <form onSubmit={handleSubmit}>
              <div className={"row"}>
                <div className={"col-md-6 col-sm-12"}>
                  <input
                    type={"text"}
                    placeholder={"Your Name"}
                    name={"name"}
                    required
                    value={contactDetails.name}
                    onChange={(e) => {
                      onchange(e.currentTarget.value, "name");
                    }}
                  />
                  <input
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    required
                    value={contactDetails.email}
                    onChange={(e) => {
                      onchange(e.currentTarget.value, "email");
                    }}
                  />
                  <InputMask
                    mask="999-999-9999"
                    value={contactDetails.phone}
                    onChange={(e) => {
                      onchange(e.currentTarget.value, "phone");
                    }}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        placeholder="Cell"
                        min="1"
                        required
                        {...inputProps}
                        step="any"
                      />
                    )}
                  </InputMask>
                </div>
                <div className={"col-md-6 col-sm-12"}>
                  <textarea
                    value={contactDetails.message}
                    placeholder={"Write your message..."}
                    required
                    onChange={(e) => {
                      onchange(e.currentTarget.value, "message");
                    }}
                  ></textarea>
                </div>
              </div>
              <p>
                {messageDone
                  ? "Your message has been sent to the support team, you can expect a reply within 12 hours. "
                  : ""}
              </p>
              <button
                type={"submit"}
                className="btn btn-green"
                value={"Submit"}
              >
                Submit
                <Loader></Loader>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
