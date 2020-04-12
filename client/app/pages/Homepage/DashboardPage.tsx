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
  home: HTMLDivElement | null;
  hero: HTMLDivElement | null;
  hIW: HTMLDivElement | null;
  wFall: HTMLDivElement | null;
  Deli: HTMLDivElement | null;
  cont: HTMLDivElement | null;
}
export const HomePage: React.FC<any>  = React.memo(() => {
  const [sectionRef, setSectionref] = useState<IRef>({
    home: null,
    hero: null,
    hIW: null,
    wFall: null,
    Deli: null,
    cont: null
  })
  let refs = {
    home: null,
    hero: null,
    hIW: null,
    wFall: null,
    Deli: null,
    cont: null
  };
  const setRef = (ref,obj,isApply) => {
    refs[ref] = obj;
    // if(isApply) setSectionref(refs);
  }
  return (
    <>
      <Header sectionRef={sectionRef}></Header>

      <div ref={(R) => setRef('home', R, false)}>
        <Slider />
      </div>
      <div ref={(R) => setRef('hero', R, false)}>
        <HeroSection />      </div>
      <div ref={(R) => setRef('hIW', R, false)}>
        <HowItWorks />
      </div>
      <div ref={(R) => setRef('wFall', R, false)}>
        <WaterFall />
      </div>
      <div ref={(R) => setRef('Deli', R, false)}>
        <Deliverables />
      </div>
      <div ref={(R) => setRef('cont', R, true)}>
        <ContactUs />
      </div>
    </>
  );
});

export default withRouter(HomePage);
