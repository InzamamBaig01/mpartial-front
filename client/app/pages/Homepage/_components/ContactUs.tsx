import * as React from "react";
import { Suspense } from "react";
import SectionTitle from "app/components/SectionTitle";
import { AppAlertsContext } from "contexts/appAlertsContext";
import InputMask from "react-input-mask";
import { sendEmail, resetPassword } from "utils/api-routes/api-routes.util";
import { useState, useContext } from "react";
import Loader from "app/components/Loader";
import { AuthContext } from "contexts/authContext";
const ReCAPTCHA = React.lazy(() => import("react-google-recaptcha"));
import appConfig from "../../../../appconfig.json";
import FloatingLabel from "app/components/FloatingLabel";

interface ConatctUsProps {}
const ContactUs: React.FC<ConatctUsProps> = ({}) => {
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const { userDetails, isUserAuthenticated } = useContext(AuthContext);
  const refs = {
    name: React.createRef(),
    email: React.createRef(),
    phone: React.createRef(),
    message: React.createRef(),
  };
  const [isLoggedIn, setIsLoggedIn] = useState(isUserAuthenticated());

  const userd = userDetails() ? userDetails() : false;
  const [contactDetails, setContactDetails] = useState({
    name: userd ? `${userd.firstName} ${userd.lastName}` : "",
    email: userd ? `${userd.emailAddress}` : "",
    phone: userd ? `${userd.phone}` : "",
    message: "",
  });
  const [messageDone, setMessageDone] = useState(false);
  const [isHuman, setIshuman] = useState(false);
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
        name: userd ? `${userd.firstName} ${userd.lastName}` : "",
        email: userd ? `${userd.emailAddress}` : "",
        phone: userd ? `${userd.phone}` : "",
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

  const onCaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    if (value) setIshuman(true);
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
                <div className={"col-md-6 col-sm-12 "}>
                  <div className="form-group nogroup">
                    <input
                      type={"text"}
                      placeholder={""}
                      name={"name"}
                      required
                      value={contactDetails.name}
                      ref={refs.name}
                      onChange={(e) => {
                        onchange(e.currentTarget.value, "name");
                      }}
                    />
                    <FloatingLabel
                      inputRef={refs.name}
                      label="Your Name"
                      inputValue={contactDetails.name}
                    />
                  </div>
                  <div className="form-group nogroup">
                    <input
                      type={"email"}
                      placeholder={""}
                      name={"email"}
                      required
                      ref={refs.email}
                      value={contactDetails.email}
                      onChange={(e) => {
                        onchange(e.currentTarget.value, "email");
                      }}
                    />
                    <FloatingLabel
                      inputRef={refs.email}
                      label="Email"
                      inputValue={contactDetails.email}
                    />
                  </div>
                  <div className="form-group nogroup">
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
                          placeholder=""
                          min="1"
                          required
                          ref={refs.phone}
                          {...inputProps}
                          step="any"
                        />
                      )}
                    </InputMask>
                    <FloatingLabel
                      inputRef={refs.phone}
                      label="Cell"
                      inputValue={contactDetails.phone}
                    />
                  </div>
                </div>
                <div className={"col-md-6 col-sm-12"}>
                  <div className="form-group nogroup">
                    <textarea
                      value={contactDetails.message}
                      placeholder={""}
                      required
                      ref={refs.message}
                      onChange={(e) => {
                        onchange(e.currentTarget.value, "message");
                      }}
                    ></textarea>
                    <FloatingLabel
                      inputRef={refs.message}
                      label="Write your message..."
                      inputValue={contactDetails.message}
                    />
                  </div>
                </div>
              </div>
              {!isLoggedIn && (
                <Suspense fallback={<div>loading ...</div>}>
                  <ReCAPTCHA
                    sitekey={appConfig.captchaKey}
                    onChange={onCaptchaChange}
                    className="captcha_box"
                  />{" "}
                </Suspense>
              )}
              <p>
                {messageDone
                  ? "Your message has been sent to the support team, you can expect a reply within 12 hours. "
                  : ""}
              </p>

              <button
                type={"submit"}
                className="btn btn-green"
                value={"Submit"}
                id="formButton"
                disabled={
                  contactDetails.name == "" ||
                  contactDetails.email == "" ||
                  contactDetails.phone == "" ||
                  contactDetails.message == "" ||
                  (!isLoggedIn && !isHuman)
                }
              >
                <Loader text="Submit"></Loader>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
