import * as React from "react";

interface FooterProps {}
import fb from "../../assets/facebook-logo.svg";
import inst from "../../assets/instagram.svg";
import twt from "../../assets/linkedin.svg";
const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={"footer"}>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-6 col-sm-12"}>
            <p>
              mpartial, a 4D Schematics Company. Copyright 2020 all rights
              reserved.
            </p>
          </div>
          <div className={"col-md-6 col-sm-12"}>
            <ul className={"social-links"}>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/mpartial1/"
                  aria-label="Facebook"
                  rel="noopener"
                >
                  <img src={fb} />{" "}
                </a>{" "}
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/mpartial_/"
                  aria-label="Instagram"
                  rel="noopener"
                >
                  <img src={inst} />{" "}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/mpartial-keep-building"
                  aria-label="Linkedin"
                  rel="noopener"
                >
                  <img src={twt} />
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
