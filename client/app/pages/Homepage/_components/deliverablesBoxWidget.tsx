import * as React from "react";
import LazyLoad from "react-lazyload";

interface DeliverablesBoxProps {
  title?: string;
  url?: string;
}

export const DeliverablesBox: React.FC<DeliverablesBoxProps> = ({
  title,
  url,
}) => {
  return (
    <>
      <LazyLoad offset={150}>
        <section>
          <h3 className={"widget-title"}>{title}</h3>
          <div>
            <iframe
              width="100%"
              height="480"
              src={url}
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="vr"
            ></iframe>
          </div>
        </section>
      </LazyLoad>
    </>
  );
};
