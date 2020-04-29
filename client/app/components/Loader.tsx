import React, { useContext, useState, useEffect } from "react";

import loadericon from "../../assets/loader.gif";
import { AppAlertsContext } from "contexts/appAlertsContext";
const Loader = () => {
  const { loader } = useContext(AppAlertsContext);
  const [isLoader, setIsLoader] = useState(loader);
  useEffect(() => {
    setIsLoader(loader);
  }, [loader]);
  return (
    <>
      <div className={`loader show_${isLoader}`}></div>
    </>
  );
};

export default Loader;
