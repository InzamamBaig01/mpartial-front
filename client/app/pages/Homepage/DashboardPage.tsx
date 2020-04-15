import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../../../contexts/appContext";
import { useContext } from "react";
import { Slider } from './_components/Slider';
import { HeroSection } from './_components/HeroSection';
import { WaterFall } from './_components/WaterFall';
import { Deliverables } from './_components/Deliverables';
import { ContactUs } from './_components/ContactUs';
import Header from "app/components/Header";
import { HowItWorks } from "./_components/HowItWorks";

interface IRef {
  home: any;
  hero: any;
  hIW: any;
  wFall: any;
  Deli: any;
  cont: any;
}
export const HomePage: React.FC<any> = React.memo(() => {
  const [sectionRef, setSectionref] = useState<IRef>({
    home: React.createRef(),
    hero: React.createRef(),
    hIW: React.createRef(),
    wFall: React.createRef(),
    Deli: React.createRef(),
    cont: React.createRef()
  })
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
        <HowItWorks />
      </div>
      <div ref={sectionRef.wFall}>
        <WaterFall />
      </div>
      <div ref={sectionRef.Deli}>
        <Deliverables />
      </div>
      <div ref={sectionRef.cont}>
        <ContactUs />
      </div>
    </>
  );
});

export default withRouter(HomePage);
