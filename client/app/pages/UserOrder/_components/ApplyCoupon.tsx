import React, { useContext, useState } from "react"; 
import { AppAlertsContext } from "contexts/appAlertsContext";
 import { AppContext } from "contexts/appContext"; 
 import { Modal } from "react-bootstrap"; 
 import Loader from "app/components/Loader";

const ApplyCoupon = (props) => {
    const { showLoader, hideLoader } = useContext(AppAlertsContext);
    const { price } = useContext(AppContext);

    const [coupon, setCoupon] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        showLoader();
        //  price - (price * (discount % / 100))
        const newPrice = price - (price * (50 / 100));
        props.onSubmitSuccess({
            coupon: coupon,
            price: newPrice,
        });
        hideLoader();
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                className="apply_coupon"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="add_card_title">Apply Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body className="support_body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Coupon Code</label>
                            <input type="text" className="form-control" required value={coupon} onChange={e => setCoupon(e.currentTarget.value)} />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-lg" type="submit">
                                <Loader text="Apply"></Loader>
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default ApplyCoupon;