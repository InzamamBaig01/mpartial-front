import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";


const fields = [
    {
        name: "Project Name",
        description: null,
        type: "text",
        required: true,
    },
    {
        name: "Project Zip Code",
        description: "Informs the applied price list",
        type: "text",
        required: true,
    },
    {
        name: "Insurance Carrier",
        description: null,
        type: "text",
    },
    {
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
        name: "Mitigation or Repair",
        description: null,
        required: true,
        type: "select",
        options: ["Mitigation", "Repair"],
    },
    {
        name: "Category",
        description: "As defined by the IICRC S500/S520",
        type: "select",
        required: true,
        options: ["blue", "cyan", "teal", "green"],
    },
    {
        name: "Residential or Commercial",
        description: null,
        type: "select",
        required: true,
        options: ["blue", "yellowMedium"],
    },
    {
        name: "Pre Mitigation/Demo Model URL",
        description: "e.g. https://my.matterport.com/show/?m=ggh5ffgbkrt",
        type: "text",
        required: true,
        typeOptions: {},
    },
    {
        name: "Post Mitigation/Demo Model URL",
        description: "e.g. https://my.matterport.com/show/?m=gjdf56vbngf",
        type: "text",
        required: true,
        typeOptions: {},
    },
    {
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
        name: "Debris Disposal",
        description: null,
        required: true,

        type: "select",
        options: ["blue", "cyan", "teal"],
    },
    {
        name: "Temporary Activities",
        description:
            'Please describe the quantities in the "Additional Information" field',
        type: "multiSelect",
        required: true,
        options: [
            "blue",
            "Temp Power",
            "N/A",
            'Other - Please describe in the "Additional Information" field',
        ],
    },
    {
        name: "Specialty Trade Selection",
        description:
            "Specialty trades typically require in-depth inspections and will be omitted from your deliverables by default. Should you wish to include various specialty trades, be sure to select from the list below.",
        type: "multiSelect",
        options: [
            "blue",
            "cyan",
            "Framing - Affected rooms only",
            "Electrical - Entire property",
            "HVAC - Entire property",
            "Framing - Entire property",
            'Other - Please describe in the "Additional Information" field',
        ],
    },
    {
        name: "PPEs Concessions",
        description:
            'Please describe the PPE concessions required e.g.,: 3 Technician(s) x 2 Day(s); (if non-applicable write "n/a")',
        type: "textarea",
    },
    {
        name: "Dry Out Monitoring Duration",
        description:
            "Please describe the type of equipment - for how many days - in what room (If applicable) / e.g.: 3 Dehumidifier(s) x 4 Day(s) - Living Room ",
        type: "textarea",
    },
    {
        name: "Additional Information / Project Details",
        description: "Please add any relevant and/or unknowable information here",
        type: "textarea",
    },
    {
        name: "Potentially Relevant Digital Assets",
        description:
            "e.g., Additional Invoices, Relevant Images, Environmental Report etc.",
        type: "multipleAttachment",
    },
    {
        name: "Email For Delivery of Results",
        description: null,
        required: true,
        type: "email",
        typeOptions: {},
    },
];

const MyOrderDetails = () => {
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Order Details</h1>
                <div className="container">
                    <div className="order_details">
                        <div className="order_details_header">
                            Order No. 0215
                                </div>

                        <div className="row order_details_info">

                            {
                                fields.map((field) => {
                                    return (
                                        <div className={`col-4 field_${field.type}`}>
                                            <label>{field.name}</label>
                                            <div className="order_details_value">Lorem Ipsum</div>
                                        </div>
                                    )
                                })
                            }



                        </div>
                            <div className="order_details_footer">
                                <button className="btn">Back</button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default withRouter(MyOrderDetails);
