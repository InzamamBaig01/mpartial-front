import * as React from "react";
import { withRouter, Link } from "react-router-dom";
import SectionTitle from "app/components/SectionTitle";

import InputMask from "react-input-mask";
import { sendEmail, resetPassword } from "utils/api-routes/api-routes.util";
import { useState } from "react";

interface ConatctUsProps {}
export const ContactUs: React.FC<ConatctUsProps> = ({}) => {


  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail({
      // to : "support@mpartial.io",
      to : "qualitybits1@gmail.com",
      content: "A contact Mesage is "
    }).subscribe((response) => {
      console.log(response)
    });
  };

  const onchange = (value, key) => {
    const details = Object.assign({}, contactDetails);
    details[key] = value;
  }
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
                    onChange={(e) => {onchange(e.currentTarget.value, 'name')}}
                  />
                  <input
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    required
                    onChange={(e) => {onchange(e.currentTarget.value, 'email')}}
                  />
                  <InputMask mask="999-999-9999"   onChange={(e) => {onchange(e.currentTarget.value, 'phone')}} >
                    {(inputProps) => (
                      <input
                        type="text"
                        placeholder="Phone Number"
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
                    placeholder={"Write your message..."}
                    required
                    onChange={(e) => {onchange(e.currentTarget.value, 'message')}}
                  ></textarea>
                </div>
              </div>
              <input
                type={"submit"}
                className="btn btn-green"
                value={"Submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
