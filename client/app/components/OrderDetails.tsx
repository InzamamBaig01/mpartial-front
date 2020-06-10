import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";

const fields = [
    {
      id: "emailForDeliveryOfResults",
      name: "Email For Delivery of Results",
      description: null,
      required: true,
      type: "email",
      typeOptions: {},
      value: "",
    },
    {
      name: "Order ID",
      description: null,
      type: "text",
      required: true,
      id: "id",
    },
    {
      id: "preMitigationDemoModelURL",
      name: "Pre Mitigation/Demo Model URL",
      placeholder: "Ex. https://my.matterport.com/show/?m=ggh5ffgbkrt",
      description: "",
      type: "url",
      required: true,
      typeOptions: {},
    },
    {
      id: "postMitigationDemoModelURL",
      name: "Post Mitigation/Demo Model URL",
      placeholder: "Ex. https://my.matterport.com/show/?m=gjdf56vbngf",
      description: "",
      type: "url",
      required: true,
      typeOptions: {},
    },
    {
      id: "debrisDisposal",
      name: "Debris Disposal",
      description:
        "If progressive dumping is required, detail this in the Additional Information / Project Details field",
      required: true,
      type: "select",
      options: ["Haul Debris", "Dumpster", "N/A"],
    },
    {
      id: "causeOfLoss",
      name: "Cause of Loss",
      description:
        "mpartial is fully compatible with interior water & fire losses",
      type: "select",
      required: true,
      options: [
        "Water",
        "Fire",
        'Other - Please inform in the "Additional Information" field',
        "N/A",
      ],
    },
    {
      id: "mitigationOrRepair",
      name: "Scope",
      description: "Select Mitigation, Repair or Both",
      required: true,
      type: "select",
      options: ["Mitigation", "Repair", "Both"],
    },
    {
      id: "category",
      name: "Category",
      description: "As defined by the IICRC S500/S520",
      type: "select",
      required: true,
      options: ["Cat 1", "Cat 2", "Cat 3", "N/A"],
    },
    {
      id: "residentialOrCommercial",
      name: "Residential or Commercial",
      description: "If you are uncertain, select Commercial",
      type: "select",
      required: true,
      options: ["Residential", "Commercial"],
    },
  
    {
      id: "durationOfTheProject",
      name: "Duration of the Project",
      description: "Either known or projected",
      type: "select",
      required: true,
      options: [
        "1 Day",
        "2 Days",
        "3 Days",
        "4 Days",
        "5 Days",
        "6 Days",
        "1 Week",
        "2 Weeks",
        "3 Weeks",
        "4 Weeks",
        "5 Weeks",
        "6 Weeks",
        "7 Weeks",
        "8 Weeks",
        "9 Weeks",
        "10 Weeks",
        "11 Weeks",
        "12 Weeks",
        "13 Weeks",
        "14 Weeks",
        "15 Weeks",
        "16 Weeks",
        "17 Weeks",
        "18 Weeks",
        "19 Weeks",
        "20 Weeks",
        "21 Weeks",
        "22 Weeks",
        "23 Weeks",
        "24 Weeks",
        "25 Weeks",
        "26 Weeks",
        "27 Weeks",
        "28 Weeks",
        "29 Weeks",
        "30 Weeks",
        "31 Weeks",
        "32 Weeks",
        "33 Weeks",
        "36 Weeks",
        "34 Weeks",
        "35 Weeks",
        "37 Weeks",
        "38 Weeks",
        "39 Weeks",
        "40 Weeks",
        "41 Weeks",
        "42 Weeks",
        "43 Weeks",
        "44 Weeks",
        "45 Weeks",
        "46 Weeks",
        "47 Weeks",
        "48 Weeks",
        "49 Weeks",
        "50 Weeks",
        "51 Weeks",
        "52 Weeks",
        'Other - Please inform in the "Additional Information" field',
      ],
    },
  
    {
      id: "temporaryActivities",
      name: "Temporary Activities",
      description:
        'Please describe the quantities in the "Additional Information" field',
      type: "multiSelect",
      required: true,
      options: [
        "Temp Toilet",
        "Temp Power",
        "N/A",
        'Other - Please describe in the "Additional Information" field',
      ],
    },
    {
      id: "projectZipCode",
      name: "Project Zip Code",
      description: "Informs the applied price list",
      type: "number",
      placeholder: "Ex. 92037",
      required: true,
    },
    {
      id: "insuranceCarrier",
      name: "Insurance Carrier",
      description: null,
      placeholder: "Ex. Nat Gen Premier",
      type: "text",
    },
    {
      id: "specialtyTradeSelection",
      name: "Specialty Trade Selection",
      description:
        "Specialty trades typically require in-depth inspections and will be omitted from your deliverables by default. Should you wish to include various specialty trades, be sure to select from the list below.",
      type: "multiSelect",
      options: [
        "Electrical - Affected rooms only",
        "HVAC - Affected rooms only",
        "Framing - Affected rooms only",
        "Electrical - Entire property",
        "HVAC - Entire property",
        "Framing - Entire property",
        'Other - Please describe in the "Additional Information" field',
        'N/A',
      ],
    },
    {
      id: "pPEsConcessions",
      name: "PPEs Concessions",
      description:
        'Please describe the PPE concessions required EX.,: 3 Technician(s) x 2 Day(s); (if non-applicable write "n/a")',
      type: "textarea",
    },
    {
      id: "dryOutMonitoringDuration",
      name: "Dry Out Monitoring Duration",
      description:
        "Please describe the type of equipment - for how many days - in what room (If applicable) / EX.: 3 Dehumidifier(s) x 4 Day(s) - Living Room ",
      type: "textarea",
    },
    {
      id: "additionalInformation",
      name: "Additional Information/Project Details",
      description:
        "Please add any relevant and/or unknowable information here. The more details you provide, the more accurate deliverables you receive. This is imperative because mpartial does NOT reopen files once your digital assets are delivered.",
      type: "textarea",
    },
    {
      id: "potentiallyRelevantDigitalAssets",
      name: "Potentially Relevant Digital Assets",
      description:
        "EX., Additional Invoices, Relevant Images, Environmental Report etc.",
      type: "multipleAttachment",
    },
  ];
  

const OrderDetails = (props) => {

    const [order, setOrder] = useState(props.order);


    useEffect(() => {
        if (props.order) {
            setOrder(props.order)
        }
    }, [props.order])
    // fields.sort((a, b) => {
    //     return a.type > b.type;
    // });

    const DrawFieldData = (props) => {
        let Data;
        switch (props.field.type) {
            case "multiSelect":
                Data = () => {
                    return (
                        <>
                            <ul className="order_detail_list">
                                {props.order[props.field.id].map((d) => (
                                    <li>{d}</li>
                                ))}
                            </ul>
                        </>
                    );
                };
                break;

            case "multipleAttachment":
                Data = () => {
                    return (
                        <>
                            {props.order[props.field.id].map((d, index) => (
                                <a href={d} target="_blank" download>
                                    Asset {index + 1}
                                </a>
                            ))}
                        </>
                    );
                };
                break;
            case "url":
                Data = () => {
                    return (
                        <>
                            {props.order[props.field.id]
                                ? (
                                    <>
                                        <a href={props.order[props.field.id]} target="_blank" >
                                            {props.order[props.field.id]}
                                        </a>
                                    </>
                                )
                                : "Not Available"}
                        </>
                    );
                };
                break;
            default:
                Data = () => {
                    return (
                        <>
                            {props.order[props.field.id]
                                ? props.order[props.field.id]
                                : "Not Available"}
                        </>
                    );
                };
                break;
        }
        return (
            <>
                <Data></Data>
            </>
        );
    };


    return (
        <>


            {order ? (
                <div className="order_details">
                    <div className="order_details_header">Project Name: {order.projectName}</div>

                    <div className="row order_details_info">
                        {fields.map((field) => {
                            return (
                                <div className={`col-md-4 col-sm-6 col-xs-6 field_${field.type}`}>
                                    <label>{field.name}</label>
                                    <div className="order_details_value">
                                        <DrawFieldData
                                            order={order}
                                            field={field}
                                        ></DrawFieldData>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="order_details_footer">
                        <Link to={props.isAdmin ? `/allorders` : `/orders`}>
                            <button className="btn">Back</button>
                        </Link>

                        <Link to={`/order/${order.id}`}>
                            <button className="btn">Load Draft</button>
                        </Link>

                        <Link to={`/payorder/${order.id}`}>
                            <button className="btn">Pay Now</button>
                        </Link>
                    </div>
                </div>
            ) : (
                    ""
                )}

        </>
    );
};

export default OrderDetails;
