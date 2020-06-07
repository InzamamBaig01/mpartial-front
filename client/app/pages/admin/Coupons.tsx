import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import Search from "../../../assets/search.svg";
import First from "../../../assets/first.svg";
import Last from "../../../assets/last.svg";
import Next from "../../../assets/next.svg";
import Previous from "../../../assets/previous.svg";
import viewicon from "../../../assets/view.svg";
import AdminSidebar from "./_components/AdminSidebar";


import { Dropdown, Modal, Button } from "react-bootstrap";
import DatePicker from 'reactstrap-date-picker';
import { AppContext } from "../../../contexts/appContext";




const AddCoupons = (props) => {

    const [data, setData] = useState({
        code: "",
        date: new Date().toISOString(),
        couponlimit: "",
        userlimit: "",
        percentage: "",
    })

    const onsubmit = (e) => {
        e.preventDefault();

        console.log(data);
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                className="edit_profile"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="add_card_title">Create New Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body className="support_body">
                    <form onSubmit={onsubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Coupon Code" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    code: e.currentTarget.value
                                })
                            } value={data.code} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Coupon Percentage" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    percentage: e.currentTarget.value
                                })
                            } value={data.percentage} min="0" max="100" step="0.10" />
                        </div>
                        <div className="form-group">
                            <DatePicker id="example-datepicker" className="form-control" required
                                value={data.date}
                                showClearButton={false}
                                placeholder="Coupon Expiry Date"
                                onChange={(v, f) => setData({
                                    ...data,
                                    date: v
                                })} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Usage Limit Per Coupon" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    couponlimit: e.currentTarget.value
                                })
                            } value={data.couponlimit} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Usage Limit Per User" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    userlimit: e.currentTarget.value
                                })
                            } value={data.userlimit} />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-lg" type="submit">Save</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};




const Coupons = () => {

    const { getallADUsers, AllUsers } = useContext(AppContext);
    const [Users, setUsers] = useState([]);

    const [AddCouponsShow, setAddCouponsShow] = useState(false);
    const handleAddCouponsclose = () => setAddCouponsShow(false);
    const handleAddCouponsShow = () => setAddCouponsShow(true);


    const onSubmitSuccess = () => {

    }

    const columns = [
        {
            name: "Code",
            selector: "firstName",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Coupon Type",
            selector: "emailAddress",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Coupon Amount",
            selector: "noOfOrders",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Usage / Limit",
            selector: "joinedOn",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Expiry date",
            selector: "joinedOn",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Action",
            selector: "action",
            sortable: false,
            className: "header-col",
            format: (d) => (
                <Link to={`/usersdetails/${window.btoa(d.emailAddress)}`}>
                    <img src={viewicon} alt="" />
                </Link>
            ),
        },
    ];

    useEffect(() => {
        getallADUsers();
    }, []);

    useEffect(() => {
        if (AllUsers.length) {
            setUsers(AllUsers);
        }
    }, [AllUsers]);
    return (
        <>
            <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
            <div className="other_pages_container">
                <div className={"admin-order-wrap"}>
                    <AdminSidebar></AdminSidebar>

                    <section>
                        <div className={"section-head mb-3"}>


                            <div className="col">
                                <h2>Coupons</h2>

                            </div>
                            <div className="col text-right">
                                <button className="btn" onClick={handleAddCouponsShow}>Create New Coupon</button>

                            </div>
                        </div>

                        <DataTable
                            columns={columns}
                            data={Users}
                            responsive={true}
                            pagination={true}
                        />
                    </section>
                </div>
            </div>
            {AddCouponsShow && (
                <AddCoupons
                    value={""}
                    onSubmitSuccess={onSubmitSuccess}
                    show={AddCouponsShow}
                    handleClose={handleAddCouponsclose}
                    info={{}}
                />
            )}

        </>
    );
};


export default withRouter(Coupons);
