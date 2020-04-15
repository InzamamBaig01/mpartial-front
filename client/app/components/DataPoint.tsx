import React from "react";

const DataPoint = (props) => {
    return (
        <>
            <div className="data_point_item row no-gutters">
                <div className="data_number col-md-4 col-sm-12">
                    {props.point.number}
                </div>
                <div className="data_text col-md-8 col-sm-12">
                    {props.point.point}
                </div>
            </div>
        </>
    )
}



export default DataPoint;
