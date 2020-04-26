import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import MultiSelect from "react-multi-select-component";
import { AuthContext } from "contexts/authContext";
import { saveOrderData } from "utils/api-routes/api-routes.util";
import history from '../../utils/history';

const fields = [
  {
    name: "Project Name",
    description: null,
    type: "text",
    required: true,
    id: "projectName",
  },
  {
    id: "projectZipCode",
    name: "Project Zip Code",
    description: "Informs the applied price list",
    type: "text",
    required: true,
  },
  {
    id: "Carrier",
    name: "Insurance Carrier",
    description: null,
    type: "text",
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
    name: "Mitigation or Repair",
    description: null,
    required: true,
    type: "select",
    options: ["Mitigation", "Repair"],
  },
  {
    id: "category",
    name: "Category",
    description: "As defined by the IICRC S500/S520",
    type: "select",
    required: true,
    options: ["cat 1", "cat 2", "cat 3", "N/A"],
  },
  {
    id: "residentialOrCommercial",
    name: "Residential or Commercial",
    description: null,
    type: "select",
    required: true,
    options: ["Residential", "Commercial"],
  },
  {
    id: "preMitigationDemoModelURL",
    name: "Pre Mitigation/Demo Model URL",
    description: "e.g. https://my.matterport.com/show/?m=ggh5ffgbkrt",
    type: "text",
    required: true,
    typeOptions: {},
  },
  {
    id: "postMitigationDemoModelURL",
    name: "Post Mitigation/Demo Model URL",
    description: "e.g. https://my.matterport.com/show/?m=gjdf56vbngf",
    type: "text",
    required: true,
    typeOptions: {},
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
  }, {
    id: "debrisDisposal",
    name: "Debris Disposal",
    description: null,
    required: true,
    type: "select",
    options: ["Haul Debris", "Dumpster", "N/A"],
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
    id: "optionalTrades",
    name: "Specialty Trade Selection",
    description:
      "Specialty trades typically require in-depth inspections and will be omitted from your deliverables by default. Should you wish to include various specialty trades, be sure to select from the list below.",
    type: "multiSelect",
    options: [
      "Framing - Affected rooms only",
      "Electrical - Affected rooms only",
      "HVAC - Affected rooms only",
      "Electrical - Entire property",
      "HVAC - Entire property",
      "Framing - Entire property",
      'Other - Please describe in the "Additional Information" field',
    ],
  },
  {
    id: "pPEsConcessions",
    name: "PPEs Concessions",
    description:
      'Please describe the PPE concessions required e.g.,: 3 Technician(s) x 2 Day(s); (if non-applicable write "n/a")',
    type: "textarea",
  },
  {
    id: "dryOutMonitoringDuration",
    name: "Dry Out Monitoring Duration",
    description:
      "Please describe the type of equipment - for how many days - in what room (If applicable) / e.g.: 3 Dehumidifier(s) x 4 Day(s) - Living Room ",
    type: "textarea",
  },
  {
    id: "projectDetails",
    name: "Additional Information / Project Details",
    description: "Please add any relevant and/or unknowable information here",
    type: "textarea",
  },
  {
    id: "Potentially Relevant Digital Assets",
    name: "Potentially Relevant Digital Assets",
    description:
      "e.g., Additional Invoices, Relevant Images, Environmental Report etc.",
    type: "multipleAttachment",
  },
  {
    id: "emailForDeliveryOfResults",
    name: "Email For Delivery of Results",
    description: null,
    required: true,
    type: "email",
    typeOptions: {},
    value: ''
  },
];


const MultipleSelectField = (props) => {
  const [selected, setSelected] = useState([]);
  const options = [];
  props.field.options.map((option) => {
    options.push({
      "label": option,
      "value": option
    });
  })

  return (
    <MultiSelect
      options={options}
      value={selected}
      required={props.field.required ? true : false}
      onChange={(value) => {
        setSelected(value);
        props.field.value = value;
      }}
      labelledBy={"Select"}
    />
  )
}

const DrawField = (props) => {
  const form = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            required={field.required ? true : false}
            className="form-control"
            onChange={(e) => { field.value = e.currentTarget.value }}
          />
        );
        break;
      case "select":
        return (
          <select
            className="form-control"
            required={field.required ? true : false}
            onChange={(e) => { field.value = e.currentTarget.value }}
          >
            <option value="">Please Select {field.name}</option>
            {Object.values(field.options).map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
        );
        break;
      case "multiSelect":
        return (
          <MultipleSelectField field={field} />
        );
        break;

      case "multipleAttachment":
        return (
          <>
            <div>
              <input
                type="file"
                multiple
                required={field.required ? true : false}
                onChange={(e) => { field.value = e.target.files }}
              />
            </div>
          </>
        );
        break;

      case "textarea":
        return (
          <textarea
            required={field.required ? true : false}
            className="form-control"
            onChange={(e) => { field.value = e.currentTarget.value }}
          ></textarea>
        );
        break;
      case "email":
        return (
          <input
            type="email"
            required={field.required ? true : false}
            value={field.value}
            className="form-control"
            onChange={(e) => { field.value = e.currentTarget.value }}
          />
        );
        break;
      default:
        return (
          <input
            type="text"
            required={field.required ? true : false}
            className="form-control"
            onChange={(e) => { field.value = e.currentTarget.value }}
          />
        );
        break;
    }
  };
  const field = props.field;
  return form(field);
};
const UserOrder = () => {

  const {
    userDetails,
  } = useContext(AuthContext);
  fields[fields.length - 1].value = userDetails().emailAddress;

  const onSubmit = e => {
    e.preventDefault();
    const apiData = {
      amountInCents: 250 * 100,
      additionalFees: '',
      potentiallyRelevantDigitalAssets: ''
    };
    const formData = new FormData();

    fields.map(field => {
      if (field.type === "multipleAttachment") {
        apiData.potentiallyRelevantDigitalAssets = field.value;
      } else if (field.type === "multiSelect") {
        apiData[field.id] = field.value ? field.value.map((v) => { return v.value }) : ""
      } else {
        apiData[field.id] = field.value;
      }
    });

    formData.append("potentiallyRelevantDigitalAssets", apiData.potentiallyRelevantDigitalAssets);

    console.log(apiData);
    saveOrderData(formData, apiData).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          console.log(response.response)
          localStorage.setItem("sessipn", response.response.message )
          history.push(`/checkout/${response.response.data.id}`);
          // dispatchGetBoardDetails();

          // showAlert({
          //   alertType: "success",
          //   message: "Your Form has been successfully submitted",
          //   isTimely: false
          // });
          // setFormSubmitted(true);
        } else {
          // showAlert({
          //   alertType: "error",
          //   message: "something wrong.",
          //   isTimely: false
          // });
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };


  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">mpartial Engine</h1>
        <div className="container">
          <form className="order_form" onSubmit={onSubmit}>
            <div className="row">
              {fields.map((field, index) => {
                const gridCol =
                  (index > 2 && index < 7) || index == 9 || index == 10
                    ? "col-6"
                    : "col-12";
                return (
                  <div className={`form-group ${gridCol}`} key={index}>
                    <label>
                      {field.name}{" "}
                      {field.required ? <span className="red">*</span> : ""}
                    </label>
                    {/* <div className="description">{field.description}</div> */}
                    <DrawField field={field}></DrawField>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <label>Price</label>
              <div className="form_price">$250</div>
            </div>

            <div className="form-group">
              <label className="terms">
                <input type="checkbox" required /> I’ve read and accept the mpartial
                 &nbsp; <span className="underline">Terms & Conditions.*</span>
              </label>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">CHECKOUT</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserOrder);
