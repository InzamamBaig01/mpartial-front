import React, { useEffect, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import image from "../../../../assets/userProfile.svg";
import trash from "../../../../assets/trash.png";

import { removeChildAccount } from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";

const ActiveUsers = (props) => {
  const { getMyInvitedUser, invitedUsers } = useContext(AppContext);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [toRemove, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const deleteUser = () => {
    removeChildAccount(toRemove).subscribe((response) => {
      if (response.response.Requested_Action) {
        //setEmail("");
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
    const filter = invitedUsers.filter(
      (user) => user.invitestatus === "Accepted"
    );
    setFilteredUser(filter);
    props.setActiveCount(filter.length);

    const deletedFilter = invitedUsers.filter(
      (user) => user.invitestatus === "Deleted"
    );
    props.setDeleteCount(deletedFilter.length);

    const pendingFilter = invitedUsers.filter(
      (user) => user.invitestatus === "Pending"
    );
    props.setPendingCount(pendingFilter.length);
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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div>
              <div className="row mb-4">
                <div className="col-10 col-sm-8 d-flex">
                  <div className="image_user d-flex align-items-center">
                    <img
                      src={
                        user.profilepictureurl ? user.profilepictureurl : image
                      }
                      alt="image"
                    />
                  </div>
                  <div className="details_user d-flex flex-column">
                    <div className="name">
                      {user.firstname + " " + user.lastname}
                    </div>
                    <div className="email">{user.email}</div>
                    <div className="email">Enterprise Collaborator</div>
                  </div>
                </div>
                <div className="col-2 col-sm-4 d-flex align-items-center justify-content-end">
                  <img
                    src={trash}
                    alt="image"
                    width="38px"
                    className="image-icon"
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
        ) : (
          <h3>No users found</h3>
        )}
      </div>
    </div>
  );
};

export default ActiveUsers;
