import React, { useEffect, useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import Modal from "react-bootstrap/Modal";
import image from "../../../../assets/download.png";
import trash from "../../../../assets/trash.png";
import resend from "../../../../assets/resend.png";

import {
  removeChildAccount,
  resendInvite,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";

const PendingUsers = (props) => {
  const { getMyInvitedUser, invitedUsers } = useContext(AppContext);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [toRemove, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const deleteUser = () => {
    removeChildAccount(toRemove).subscribe((response) => {
      if (response.response.Requested_Action) {
        setEmail("");
      }
      getMyInvitedUser();
    });
  };
  const InviteUser = (email) => {
    resendInvite(email).subscribe((response) => {
      if (response.response.Requested_Action) {
      }
      getMyInvitedUser();
    });
  };

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  useEffect(() => {
    getMyInvitedUser();
  }, []);

  useEffect(() => {
    getMyInvitedUser();
  }, [props.email]);

  useEffect(() => {
    const filter = invitedUsers.filter(
      (user) => user.invitestatus === "Pending"
    );
    setFilteredUser(filter);
  }, [invitedUsers]);

  return (
    <div>
      <Modal show={modal} onHide={handleClose} className="cancel_subscription">
        <Modal.Header toggle={handleClose}>Alert</Modal.Header>
        <Modal.Body>Do you want to delete the user?</Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Cancel{" "}
          </button>{" "}
          <button
            className="btn"
            onClick={() => {
              deleteUser();
              handleClose();
            }}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <div className="manager_users">
        {filteredUsers
          ? filteredUsers.map((user, i) => (
              <div>
                <div className="row mb-4">
                  <div className="col-10 col-sm-8 d-flex">
                    <div className="image_user d-flex align-items-center">
                      <img src={image} alt="image" />
                    </div>
                    <div className="details_user d-flex flex-column">
                      <div className="name">{user.name}</div>
                      <div className="email">{user.email}</div>
                      <div className="email">Child</div>
                    </div>
                  </div>
                  <div className="col-2 col-sm-4 d-flex align-items-center justify-content-end">
                    <img
                      data-tip
                      data-for={"registerTip" + i}
                      src={resend}
                      alt="image"
                      onClick={() => {
                        InviteUser(user.email);
                      }}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <ReactTooltip
                      id={"registerTip" + i}
                      place="top"
                      effect="solid"
                    >
                      Resend Invitation
                    </ReactTooltip>

                    <img
                      src={trash}
                      alt="image"
                      onClick={() => {
                        handleShow();
                        setEmail(user.email);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <hr />
              </div>
            ))
          : "No users"}
      </div>
    </div>
  );
};

export default PendingUsers;
