import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
import OrderDetails from "app/components/OrderDetails";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { updateStatus } from "utils/api-routes/api-routes.util";

const fields = [
    {
        name: "First Name",
        id: "firstName",
        type: 'text',
    },{
        name: "Last Name",
        id: "lastName",
        type: 'text',
    },{
        name: "Total Orders",
        id: "noOfOrders",
        type: 'text',
    },{
        name: "Cell",
        id: "phone",
        type: 'text',
    },{
        name: "Profile Status",
        id: "profilestatus",
        type: 'text',
    },{
        name: "Role",
        id: "role",
        type: 'text',
    },
]

const AdminUserDetails = (props) => {


    const { getADUserById, singleUserDetails } = useContext(AppContext);

    const userid = props.match.params.userid ? window.atob(props.match.params.userid) : false;
    const [user, setUser] = useState(false);
    useEffect(() => {
        getADUserById(userid);
    }, []);

    useEffect(() => {
        if (singleUserDetails) {
           // console.log(singleUserDetails);
            setUser(singleUserDetails);
        }
    }, [singleUserDetails]);


    return (
        <>
        { user ? true : <img src={require("../../../assets/loader.gif")} alt="loading..." 
        style={{
                  position: "absolute",
                  height: "100px",
                  width: "100px",
                  top: "50%",
                  left: "50%",
                  marginleft: "-50px",
                  margintop: "-50px",
                }}/>
                }
            <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
            <div className="other_pages_container">
                <div className={"admin-order-wrap"}>
                    <AdminSidebar></AdminSidebar>

                    <section>
                        <div className={"section-head"}>
                            <div>
                                {/* <h2>Orders</h2> */}
                            </div>
                            <div>
                                <div className="text-right">

                                </div>
                            </div>
                        </div>
                        {
                            user ? (<div className="order_details">
                                <div className="order_details_header">Email: {user.emailAddress}</div>
                                <div className="row order_details_info">

                                {fields.map((field) => {
                                    return (
                                        <div className={`col-md-4 col-sm-6 col-xs-6 field_${field.type}`}>
                                            <label>{field.name}</label>
                                            <div className="order_details_value">
                                               {user[field.id]}
                                            </div>
                                        </div>
                                    );
                                })}
                                </div>
                                <div className="order_details_footer">
                                    <Link to={`/user-management`}>
                                        <button className="btn">Back</button>
                                    </Link>
                                </div>
                            </div>
                            ) : (
                                    <>
                                    </>
                                )
                        }

                    </section>
                </div>
            </div>
        </>
    );
};

export default withRouter(AdminUserDetails);
