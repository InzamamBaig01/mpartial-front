import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <aside>
        <ul>
          <li>
            <Link to="/allorders">
              <span></span>Orders
            </Link>
          </li>
          <li>
            <Link to="/user-management">
              <span></span> Customers
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
