import React from "react";

const SectionTitle = (props) => {
  return (
    <>
      {props.type === "left" ? (
        <div className="title left">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="section_title_text">{props.title}</h1>
            </div>
            <div className="col-md-6 col-sm-12">
              <p className="section_title_description">{props.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="title center">
          <div className="row">
            <div className="col">
              <h1 className="section_title_text">{props.title}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionTitle;
