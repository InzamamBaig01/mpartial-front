import React, { useEffect, useState, Suspense } from "react";
import { withRouter } from "react-router-dom";
import { Slider } from "./_components/Slider";
import HeroSection from "./_components/HeroSection";
//const HeroSection = React.lazy(() => import("./_components/HeroSection"));
const WaterFall = React.lazy(() => import("./_components/WaterFall"));
const Deliverables = React.lazy(() => import("./_components/Deliverables"));
const ContactUs = React.lazy(() => import("./_components/ContactUs"));
const Header = React.lazy(() => import("app/components/Header"));
const HowItWorks = React.lazy(() => import("./_components/HowItWorks"));
const Footer = React.lazy(() => import("../../components/Footer"));
import { acceptInvite } from "utils/api-routes/api-routes.util";

import queryString from "query-string";

interface IRef {
  home: any;
  hero: any;
  hIW: any;
  wFall: any;
  Deli: any;
  cont: any;
  footer: any;
}
export const HomePage: React.FC<any> = React.memo((props) => {
  const values = queryString.parse(props.location.hash);

  const value = queryString.parse(props.location.search);

  console.log("VAL", value);
  const gotoSection = Object.keys(values);
  const sectionMap = {
    Approach: "home",
    "Ground-Truth-Data": "hero",
    "How-It-Works": "hIW",
    "Fee-Structure": "wFall",
    "Example-Deliverables": "Deli",
    "Contact-US": "footer",
  };
  const [sectionRef, setSectionref] = useState<IRef>({
    home: React.createRef(),
    hero: React.createRef(),
    hIW: React.createRef(),
    wFall: React.createRef(),
    Deli: React.createRef(),
    cont: React.createRef(),
    footer: React.createRef(),
  });

  const scrollToRef = (ref, to) => {
    // console.log(props.sectionRef);
    // if (window.innerWidth <= 770) toggle();

    setTimeout(() => {
      if (ref) {
        window.scrollTo({
          top:
            to == "footer"
              ? ref.current.offsetTop + 1000
              : ref.current.offsetTop,
          behavior: "smooth",
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (Object.keys(values).length) {
      scrollToRef(
        sectionRef[sectionMap[gotoSection[0]]],
        sectionMap[gotoSection[0]]
      );
    }

    acceptInvite(
      queryString.stringify({
        invitedsemail: value.invitedsemail,
        inviteid: value.inviteid,
      })
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        //setSuccess("true");
      } else {
        console.log(response.response.Message);
        //setSuccess(response.response.Message);
      }
    });
  }, []);
  return (
    <>
      <Suspense fallback={<div>loading ...</div>}>
        <Header sectionRef={sectionRef}></Header>
      </Suspense>
      <div ref={sectionRef.home}>
        <Slider nextSection={sectionRef.hero} />
      </div>
      <div ref={sectionRef.hero}>
        <HeroSection />

        {/* <Suspense fallback={<div></div>}>
          <HeroSection />
        </Suspense> */}
      </div>
      <div ref={sectionRef.hIW}>
        <Suspense fallback={<div>loading ...</div>}>
          <HowItWorks />
        </Suspense>
      </div>
      <div ref={sectionRef.wFall}>
        <Suspense fallback={<div>loading ...</div>}>
          <WaterFall />
        </Suspense>
      </div>
      <div ref={sectionRef.Deli}>
        <Suspense fallback={<div>loading ...</div>}>
          <Deliverables />
        </Suspense>
      </div>
      <div ref={sectionRef.cont}>
        <Suspense fallback={<div>loading ...</div>}>
          <ContactUs />
        </Suspense>
      </div>
      <div ref={sectionRef.footer}>
        <Suspense fallback={<div>loading ...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
});

export default withRouter(HomePage);
