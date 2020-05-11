import React, { useEffect, useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import MultiSelect from "react-multi-select-component";
import { AuthContext } from "contexts/authContext";
import {
  saveOrderData,
  saveFileOrderData,
} from "utils/api-routes/api-routes.util";
import history from "../../utils/history";
import queryString from "query-string";
import { AppContext } from "contexts/appContext";
import { AppAlertsContext } from "contexts/appAlertsContext";
import Loader from "app/components/Loader";
import Mail from "../../assets/email.svg";
import _ from "lodash";

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
    name: "Project Name",
    description: "",
    type: "text",
    placeholder: "Ex. Wick-Mitigation",
    required: true,
    id: "projectName",
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
    id: "Carrier",
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
    id: "projectDetails",
    name: "Additional Information/Project Details",
    description:
      "Please add any relevant and/or unknowable information here. The more details you provide, the more accurate deliverables you receive. This is imperative because mpartial does NOT reopen files once your digital assets are delivered.",
    type: "textarea",
  },
  {
    id: "Potentially Relevant Digital Assets",
    name: "Potentially Relevant Digital Assets",
    description:
      "EX., Additional Invoices, Relevant Images, Environmental Report etc.",
    type: "multipleAttachment",
  },
];

const MultipleSelectField = (props) => {
  const [selected, setSelected] = useState([]);
  const [valid, setValid] = useState(null);
  const options = [];
  props.field.options.map((option) => {
    options.push({
      label: option,
      value: option,
    });
  });

  return (
    <MultiSelect
      options={options}
      value={selected}
      required={props.field.required ? true : false}
      className={`valid_${
        valid != null ? (selected.length != 0 ? "true" : "false") : "0"
      }`}
      onChange={(value) => {
        setSelected(value);
        setValid(true);
        props.onChange(props.field, value);
        props.field.value = value;
      }}
      labelledBy={"Select"}
    />
  );
};

const DrawField = (props) => {
  const [value, setValue] = useState(props.field.value);
  const [files, setFiles] = useState([]);
  const [changed, setChanged] = useState(false);
  const onChange = (e) => {
    if (e.target.files) {
      const newFiles = Object.assign([], files);
      newFiles.push(e.currentTarget.files[0]);
      field.value = newFiles;
      props.onChange(field, newFiles);
      setFiles(newFiles);
    } else {
      props.onChange(field, e.currentTarget.value);
      field.value = e.currentTarget.value;
      setValue(e.currentTarget.value);
    }
    setChanged(true);
  };

  const removeFile = (index) => {
    setFiles(
      _.remove(files, function (n, idex) {
        return idex != index;
      })
    );
  };

  const form = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            required={field.required ? true : false}
            className={`form-control is_required_${
              field.required ? true : false
            } changed_${changed}`}
            placeholder={field.placeholder}
            onChange={onChange}
            value={value}
          />
        );
        break;
      case "number":
        return (
          <input
            type="number"
            required={field.required ? true : false}
            className={`form-control is_required_${field.required} changed_${changed}`}
            placeholder={field.placeholder}
            value={value}
            onChange={onChange}
          />
        );
        break;
      case "select":
        return (
          <select
            className={`form-control is_required_${field.required} changed_${changed}`}
            required={field.required ? true : false}
            onChange={onChange}
            value={value}
          >
            <option value="" selected disabled hidden css={{ display: "none" }}>
              Select {field.name}
            </option>
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
        return <MultipleSelectField field={field} onChange={props.onChange} />;
        break;

      case "multipleAttachment":
        return (
          <>
            <div className="button-wrap">
              <label className="new-button" htmlFor="upload">
                Choose Files
              </label>
              <input
                id="upload"
                type="file"
                // value={value}
                required={field.required ? true : false}
                onChange={onChange}
              />
              {files.length
                ? files.map((file, index) => {
                    return (
                      <div className="selected_file_name" key={index}>
                        <i className="close" onClick={() => removeFile(index)}>
                          &times;
                        </i>

                        <i className="">
                          <small>{file.name}</small>
                        </i>
                      </div>
                    );
                  })
                : ""}
            </div>
            {/*<input type="file" className="custom-file-input-btn" onChange={(e) => {*/}
            {/*props.onChange(field, e.target.files);*/}
            {/*field.value = e.target.files;*/}
            {/*}} />*/}
            {/*<label htmlFor="file-upload" className="custom-file-upload btn-green">*/}
            {/*Choose Files*/}
            {/*</label>*/}
          </>
        );
        break;

      case "textarea":
        return (
          <textarea
            required={field.required ? true : false}
            className={`form-control is_required_${field.required} changed_${changed}`}
            value={value}
            onChange={onChange}
          ></textarea>
        );
        break;
      case "email":
        return (
          <input
            type="email"
            className={`form-control is_required_${field.required} changed_${
              changed || value.length != 0
            }`}
            value={value}
            placeholder="Email"
            onChange={onChange}
            required
          />
        );
        break;

      case "url":
        return (
          <>
            <input
              type="url"
              required={field.required ? true : false}
              className={`form-control is_required_${field.required} changed_${changed}`}
              placeholder={field.placeholder}
              value={value}
              onChange={onChange}
            />
            {props.matchingUrl && field.id == "postMitigationDemoModelURL" && (
              <i className="red">
                <small>Please submit unique Matterport Scan URLs.</small>
              </i>
            )}
          </>
        );
        break;
      default:
        return (
          <input
            type="text"
            required={field.required ? true : false}
            className={`form-control is_required_${field.required} changed_${changed}`}
            placeholder={field.placeholder}
            onChange={onChange}
            value={value}
          />
        );
        break;
    }
  };
  const field = props.field;
  return form(field);
};

const UserOrder = () => {
  const { userDetails } = useContext(AuthContext);
  fields[0].value = userDetails().emailAddress;

  const [allFields, setAllFields] = useState(fields);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const { price } = useContext(AppContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

  const [matchingUrl, setMatchingUrl] = useState(false);
  const uploadFiles = (id, files, index) => {
    if (files && files[index]) {
      const formData = new FormData();

      formData.append("potentiallyRelevantDigitalAssets", files[index]);

      saveFileOrderData(formData, {
        orderId: id,
      }).subscribe((response) => {
        uploadFiles(id, files, index + 1);
      });
    } else {
      hideLoader();
      history.push(`/checkout/${id}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    showLoader();
    const apiData = {
      amountInCents: price * 100,
      additionalFees: "",
      thetoken: localStorage.token,
    };
    let fileToUpload;
    const formData = new FormData();

    allFields.map((field) => {
      if (field.type === "multipleAttachment") {
        fileToUpload = field.value;
      } else if (field.type === "multiSelect") {
        apiData[field.id] = field.value
          ? field.value.map((v) => {
              return v.value;
            })
          : "";
      } else {
        apiData[field.id] = field.value;
      }
    });

    //console.log(fileToUpload)

    const stringified = queryString.stringify(apiData);

    // if (fileToUpload)
    //   formData.append("potentiallyRelevantDigitalAssets", fileToUpload[0]);

    saveOrderData(formData, stringified).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          // console.log(response.response);
          localStorage.setItem("sessipn", response.response.message);

          console.log(response.response);

          uploadFiles(response.response.data.id, fileToUpload, 0);
        } else {
          hideLoader();
        }
      },
      (response) => {
        //console.log(response);
      }
    );
  };

  const form = React.createRef();

  const checkFormValidation = () => {
    if (form && form.current) {
      setSubmitBtnDisabled(!form.current.checkValidity());
      // setSubmitBtnDisabled(false);
    }
  };

  useEffect(() => {
    checkFormValidation();
  }, []);

  useEffect(() => {
    // console.log(fields);
    checkFormValidation();
    checkMatchingUrl();
  }, [allFields]);

  const checkMatchingUrl = () => {
    // console.log(fields);
    const firstUrl = fields.filter((field) => {
      return field.id == "preMitigationDemoModelURL";
    });
    const secondUrl = fields.filter((field) => {
      return field.id == "postMitigationDemoModelURL";
    });

    if (firstUrl[0].value && secondUrl[0].value) {
      const isMatch = firstUrl[0].value == secondUrl[0].value;
      if (!submitBtnDisabled) setSubmitBtnDisabled(isMatch ? true : false);
      setMatchingUrl(isMatch);
    }
  };

  const handleChange = (field, value) => {
    // console.log(field, value);
    checkFormValidation();
    let fieldsData = Object.assign([], allFields);
    fieldsData = fieldsData.map((f) => {
      // console.log(f);
      if (f.id == field.id) {
        f.value = value;
      }
      return f;
    });

    setAllFields(fieldsData);
  };

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">mpartial Engine</h1>
        <div className="container">
          <form className="order_form" onSubmit={onSubmit} ref={form}>
            <div className="row">
              {fields.map((field, index) => {
                const gridCol =
                  (index > 3 && index < 8) || index == 10 || index == 11
                    ? "col-6 select_box_field"
                    : "col-12";
                return (
                  <div className={`form-group ${gridCol}`} key={index}>
                    <label>
                      {field.name}{" "}
                      {field.required ? <span className="red">*</span> : ""}
                    </label>
                    <div
                      className={`description small_${
                        field.id != "projectZipCode" &&
                        field.description?.length <= 42
                      }`}
                    >
                      {field.description}
                    </div>
                    <DrawField
                      field={field}
                      onChange={handleChange}
                      matchingUrl={matchingUrl}
                    ></DrawField>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <label>Price</label>
              <div className="form_price">${price}</div>
            </div>

            <div className="form-group">
              <label className="terms">
                <input type="checkbox" required onClick={handleChange} /> I’ve
                read and accept the mpartial{" "}
                <Link to="/terms">
                  <span className="underline">Terms & Conditions</span>
                </Link>
                <span className="red">*</span>
              </label>
            </div>
            <div className="form-group submit_btn_container">
              <button
                className="btn btn-green"
                type="submit"
                onClick={checkFormValidation}
                id="formButton"
                disabled={submitBtnDisabled}
              >
                Proceed to Checkout
                <Loader></Loader>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserOrder);
