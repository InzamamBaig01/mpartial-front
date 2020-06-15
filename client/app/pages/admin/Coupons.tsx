import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import Search from "../../../assets/search.svg";
import First from "../../../assets/first.svg";
import Last from "../../../assets/last.svg";
import Next from "../../../assets/next.svg";
import Previous from "../../../assets/previous.svg";
import viewicon from "../../../assets/profile_edit.svg";
import AdminSidebar from "./_components/AdminSidebar";


import { Dropdown, Modal, Button } from "react-bootstrap";
import DatePicker from 'reactstrap-date-picker';
import { AppContext } from "../../../contexts/appContext";
import { addCoupen, getAllCoupen } from "utils/api-routes/api-routes.util";
import { data } from "jquery";
import moment from "moment";




const AddCoupons = (props) => {

    const [data, setData] = useState({
        coupencode: "",
        activefrom: new Date().toISOString(),
        maxusagecount: "",
        offpercentage: "",
        subtractfixedamount: "",
        forcustomeremail: "",
        expiry: new Date().toISOString()
    });
    const { getallADUsers, AllUsers } = useContext(AppContext);

    const [couponType, setCouponType] = useState("Percentage");
    const [couponFor, setCouponFor] = useState("public");
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        getallADUsers();
    }, []);

    useEffect(() => {
        if (AllUsers.length) {
            setUsers(AllUsers);
        }
    }, [AllUsers]);


    const onsubmit = (e) => {
        e.preventDefault();
        data.expiry = moment(data.expiry).format("YYYY-MM-DD");
        data.activefrom = moment(data.activefrom).format("YYYY-MM-DD");
        console.log(data);
        addCoupen(data).subscribe(response => {
            if (response.response.Requested_Action) {
                props.onSubmitSuccess();
                props.handleClose();
            }
        })
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
                            <label>Coupon Code</label>
                            <input type="text" placeholder="Coupon Code" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    coupencode: e.currentTarget.value
                                })
                            } value={data.coupencode} />
                        </div>
                        <div className="form-group">
                            <label>Coupon Type (Fixed or Percecntage)</label>
                            <select placeholder="Coupon Type" className="form-control" value={couponType} onChange={(e) => setCouponType(e.currentTarget.value)}>
                                <option>Fixed</option>
                                <option>Percentage</option>
                            </select>
                        </div>
                        {
                            couponType == "Percentage" ? (

                                <div className="form-group">
                                    <label>Coupon Percecntage</label>

                                    <input type="number" placeholder="Coupon Percentage" className="form-control" required onChange={
                                        (e) => setData({
                                            ...data,
                                            offpercentage: e.currentTarget.value
                                        })
                                    } value={data.offpercentage} min="0" max="100" step="0.10" />
                                </div>
                            ) : (

                                    <div className="form-group">
                                        <label>Coupon Fixed Amount</label>

                                        <input type="number" placeholder="Coupon Fixed Amount" className="form-control" required onChange={
                                            (e) => setData({
                                                ...data,
                                                subtractfixedamount: e.currentTarget.value
                                            })
                                        } value={data.subtractfixedamount} />
                                    </div>
                                )
                        }
                        <div className="form-group">
                            <label>Coupon For (Customer or public)</label>
                            <select placeholder="Coupon Type" className="form-control" value={couponFor} onChange={(e) => setCouponFor(e.currentTarget.value)}>
                                <option>Public</option>
                                <option>Customer</option>
                            </select>
                        </div>

                        {
                            couponFor == "Customer" ? (
                                <div className="form-group">
                                    <select className="form-control" value={data.forcustomeremail} onChange={
                                        (e) => setData({
                                            ...data,
                                            forcustomeremail: e.currentTarget.value
                                        })
                                    }>
                                        {
                                            Users.map(user => {
                                                return (
                                                    <option value={user.emailAddress}>{user.firstName} {user.lastName} - {user.emailAddress}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            ) : ""
                        }
                        <div className="form-group">
                            <label>Coupon Active From</label>
                            <DatePicker id="example-datepicker" className="form-control" required
                                value={data.activefrom}
                                showClearButton={false}
                                placeholder="Coupon Active From"
                                onChange={(v, f) => setData({
                                    ...data,
                                    activefrom: v
                                })} />
                        </div>

                        <div className="form-group">
                            <label>Coupon Expiry Date</label>
                            <DatePicker id="example-datepickers" className="form-control" required
                                value={data.expiry}
                                showClearButton={false}
                                placeholder="Coupon Expiry Date"
                                onChange={(v, f) => setData({
                                    ...data,
                                    expiry: v
                                })} />
                        </div>
                        <div className="form-group">
                            <label>Usage Limit Per Coupon</label>
                            <input type="number" placeholder="Usage Limit Per Coupon" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    maxusagecount: e.currentTarget.value
                                })
                            } value={data.maxusagecount} />
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





const EditCoupons = (props) => {

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

    const obj = {
        "activefrom": "string",
        "coupencode": "string",
        "description": "string",
        "expiry": "string",
        "forcustomeremail": "string",
        "id": 0,
        "maxusagecount": 0,
        "offpercentage": 0,
        "subtractfixedamount": 0,
        "usedtimes": 0
    };


    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                className="edit_profile"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="add_card_title">Edit Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body className="support_body">
                    <form onSubmit={onsubmit}>
                        <div className="form-group">
                            <label>Coupon Code</label>
                            <input type="text" placeholder="Coupon Code" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    code: e.currentTarget.value
                                })
                            } value={data.code} />
                        </div>
                        <div className="form-group">
                            <label>Coupon Percecntage</label>
                            <input type="number" placeholder="Coupon Percentage" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    percentage: e.currentTarget.value
                                })
                            } value={data.percentage} min="0" max="100" step="0.10" />
                        </div>
                        <div className="form-group">
                            <label>Coupon Active From</label>
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
                            <label>Usage Limit Per Coupon</label>
                            <input type="number" placeholder="Usage Limit Per Coupon" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    couponlimit: e.currentTarget.value
                                })
                            } value={data.couponlimit} />
                        </div>
                        <div className="form-group">
                            <label>Usage Limit Per User</label>
                            <input type="number" placeholder="Usage Limit Per User" className="form-control" required onChange={
                                (e) => setData({
                                    ...data,
                                    userlimit: e.currentTarget.value
                                })
                            } value={data.userlimit} />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-lg" type="submit">Update</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};




const Coupons = () => {

    const [Coupons, setCoupons] = useState([]);

    const [AddCouponsShow, setAddCouponsShow] = useState(false);
    const handleAddCouponsclose = () => setAddCouponsShow(false);
    const handleAddCouponsShow = () => setAddCouponsShow(true);


    const [EditCouponShow, setEditCouponShow] = useState(false);
    const handleEditCouponclose = () => setEditCouponShow(false);
    const handleEditCouponShow = () => setEditCouponShow(true);


    useEffect(() => {
        getCoupons();
        handleAddCouponsclose();
    }, [])

    const getCoupons = () => {
        getAllCoupen().subscribe(response => {
            setCoupons(response.response.data);
        });
    }


    const onSubmitSuccess = () => {
        getCoupons();
    }

    const columns = [
        {
            name: "Code",
            selector: "coupencode",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Active From",
            selector: "activefrom",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Expiry",
            selector: "expiry",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Usage / Limit",
            selector: "maxusagecount",
            sortable: false,
            className: "header-col",
        },
        {
            name: "Action",
            selector: "action",
            sortable: false,
            className: "header-col",
            format: (d) => (
                <a href="javascript:;" onClick={handleEditCouponShow}>
                    <img src={viewicon} alt="" />
                </a>
            ),
        },
    ];


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
                            data={Coupons}
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

            {EditCouponShow && (
                <EditCoupons
                    value={""}
                    onSubmitSuccess={onSubmitSuccess}
                    show={EditCouponShow}
                    handleClose={handleEditCouponclose}
                    info={{}}
                />
            )}

        </>
    );
};


export default withRouter(Coupons);
