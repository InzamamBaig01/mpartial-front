import React, { useEffect, useState, Suspense } from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../../../contexts/appContext";
import { useContext } from "react";
import { Slider } from "./_components/Slider";
import { HeroSection } from "./_components/HeroSection";
const WaterFall = React.lazy(() => import("./_components/WaterFall"));
import { Deliverables } from "./_components/Deliverables";
const ContactUs = React.lazy(() => import("./_components/ContactUs"));
import Header from "app/components/Header";
const HowItWorks = React.lazy(() => import("./_components/HowItWorks"));
import { Footer } from "../../components/Footer";
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
  }, []);
  return (
    <>
      <Header sectionRef={sectionRef}></Header>
      <div ref={sectionRef.home}>
        <Slider nextSection={sectionRef.hero} />
      </div>
      <div ref={sectionRef.hero}>
        <HeroSection />
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
        <Deliverables />
      </div>
      <div ref={sectionRef.cont}>
        <Suspense fallback={<div>loading ...</div>}>
          <ContactUs />
        </Suspense>
      </div>
      <div ref={sectionRef.footer}>
        <Footer />
      </div>
    </>
  );
});

export default withRouter(HomePage);
