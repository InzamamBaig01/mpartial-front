import React from "react";
import Search from "../../../../assets/search.svg";

const AdminSearch = (props) => {
  return (
    <div>
      <div
        className="input-group search-input-group"
        style={{ marginBottom: "20px" }}
      >
        <img className="input_icon" src={Search} alt="" />
        <input
          type="text"
          className="form-control "
          placeholder="Search"
          required
          value={props.searchInput}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default AdminSearch;
