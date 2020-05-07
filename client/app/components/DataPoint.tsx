import React from "react";

const DataPoint = (props) => {
    return (
        <>
            <div className="data_point_item row no-gutters">
                <div className={`data_number data_number_${props.point.number} col-md-4 col-sm-12`}>
                    {props.point.number}
                </div>
                <div className={`data_text  col-md-8 col-sm-12 `}>
                    {
                        props.point.number == 1 ? (
                            <a href="https://www.getinsights.org/matterport-standards/" >{props.point.point}</a>
                        ) : (
                                <span>{props.point.point}</span>
                            )
                    }

                </div>
            </div>
        </>
    )
}



export default DataPoint;
