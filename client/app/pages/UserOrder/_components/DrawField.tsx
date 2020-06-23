import React, { useState, useEffect } from "react";
import _ from "lodash";
import MultipleSelectField from "./MultipleSelectField";

const DrawField = (props) => {
  const [value, setValue] = useState(props.field.value);
  const [files, setFiles] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setValue(props.field.value);
    setChanged(true);
  }, [props.field.value])

  const onChange = (e) => {
    if (e.target.files) {
      const newFiles = Object.assign([], files);
      newFiles.push(e.currentTarget.files[0]);
      field.value = newFiles;
      props.onChange(field, newFiles);
      setFiles(newFiles);
    } else {
      setValue(e.currentTarget.value);

      props.onChange(field, e.currentTarget.value);
      field.value = e.currentTarget.value;
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
          <>
            <select
              className={`form-control is_required_${field.required} changed_${changed}`}
              required={field.required ? true : false}
              onChange={onChange}
              defaultValue=""
              value={value}
            >
              <option value="" disabled hidden css={{ display: "none" }}>
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
          </>
        );
        break;
      case "multiSelect":
        return <MultipleSelectField field={field} value={value} onChange={props.onChange} />;
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




export default DrawField;