import React, { useContext, useState, useEffect } from "react";

import loadericon from "../../assets/loader.gif";
import { AppAlertsContext } from "contexts/appAlertsContext";
const Loader = (props) => {
  const { loader } = useContext(AppAlertsContext);
  const [isLoader, setIsLoader] = useState(loader);
  useEffect(() => {
    setIsLoader(loader);
  }, [loader]);
  return (
    <>
      {props.text && !isLoader ? props.text : ""}
      <div className={`loader show_${isLoader}`}></div>
    </>
  );
};

export default Loader;
