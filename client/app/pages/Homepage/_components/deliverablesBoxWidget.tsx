import * as React from "react";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

interface DeliverablesBoxProps {
  title?: string;
  url?: string;
}

export const DeliverablesBox: React.FC<DeliverablesBoxProps> = ({
  title,
  url,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 6000);
  }, []);
  return (
    <>
      <section>
        <h3 className={"widget-title"}>{title}</h3>
        <div>
          {show ? (
            <iframe
              width="100%"
              height="480"
              src={url}
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="vr"
            ></iframe>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>
    </>
  );
};
