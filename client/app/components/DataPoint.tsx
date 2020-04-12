import React from "react";

const DataPoint = (props) => {
    return (
        <>
            <div className="data_point_item row no-gutters">
                <div className="data_number col-4">
                    {props.point.number}
                </div>
                <div className="data_text col-8">
                    {props.point.point}
                </div>
            </div>
        </>
    )
}



export default DataPoint;