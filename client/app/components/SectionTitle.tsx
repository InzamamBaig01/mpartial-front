import React from "react";

const SectionTitle = (props) => {

    return (
        <>
            {
                props.type === "left" ? (
                    <div className="title left">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="section_title_text">
                                    {
                                        props.title
                                    }
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="section_title_description">
                                    {
                                        props.description
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="title center">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_text">
                                {
                                    props.title
                                }
                            </div>
                        </div>
                    </div>
                </div>
                    )
            }
        </>
    )
}


export default SectionTitle;
