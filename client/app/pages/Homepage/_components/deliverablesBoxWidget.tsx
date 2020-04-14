import * as React from 'react';

interface DeliverablesBoxProps {
  title?:string;
  imgUrl?:string;
}

export const DeliverablesBox:React.FC<DeliverablesBoxProps> = ({title,imgUrl}) => {
  return(
    <>
      <section>
        <h3 className={'widget-title'}>{title}</h3>
        <div>
          <img src={imgUrl}/>
        </div>
      </section>
    </>
  );
};
