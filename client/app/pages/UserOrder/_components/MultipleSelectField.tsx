import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

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
        hasSelectAll={props.field.hasSelectAll}
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


  export default MultipleSelectField;