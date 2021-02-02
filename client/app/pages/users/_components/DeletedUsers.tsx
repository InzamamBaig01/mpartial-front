import React, { useEffect, useContext, useState } from "react";
import queryString from "query-string";
import Modal from "react-bootstrap/Modal";
import image from "../../../../assets/userProfile.svg";
import reinvite from "../../../../assets/reinvite.png";
import check from "../../../../assets/checkBig.png";
import chat from "../../../../assets/chat.png";

import { inviteDeletedUsers } from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";

const DeletedUsers = (props) => {
  const { getMyInvitedUser, invitedUsers } = useContext(AppContext);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [toRemove, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const [formDetails, setFormDetails] = useState({
    toInvite: "",
    inviteMessage: "",
  });

  const onClick = (email) => {
    const stringified = queryString.stringify(formDetails);
    inviteDeletedUsers(email, formDetails.inviteMessage).subscribe(
      (response) => {
        if (response.response.Requested_Action) {
          setError(false);
          handleShow();
        } else {
          setError(response.response.Message);
          handleShow();
        }
        getMyInvitedUser();
      }
    );
  };
  const handleClose = () => {
    setError(false);
    setModal(false);
  };
  const handleShow = () => setModal(true);

  useEffect(() => {
    getMyInvitedUser();
  }, []);

  useEffect(() => {
    const filter = invitedUsers.filter(
      (user) => user.invitestatus === "Deleted"
    );
    setFilteredUser(filter);

    const activeFilter = invitedUsers.filter(
      (user) => user.invitestatus === "Accepted"
    );
    props.setActiveCount(activeFilter.length);

    props.setDeleteCount(filter.length);
  }, [invitedUsers]);

  return (
    <div>
      <Modal show={modal} onHide={handleClose} className="cancel_subscription">
        <Modal.Body style={{ margin: "0 auto" }}>
          <div
            className="d-flex align-items-center justify-content-center mt-3"
            style={{ margin: "0 auto" }}
          >
            {error ? (
              <img src={chat} width="60px" />
            ) : (
              <img src={check} width="60px" />
            )}
          </div>

          <div className="mt-4 text-center">
            {error ? error : "User Reactivated"}
          </div>
        </Modal.Body>{" "}
        <Modal.Footer style={{ borderTop: "none", margin: "0 auto" }}>
          <button className="btn" onClick={handleClose}>
            Close
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
                    <img src={image} alt="image" />
                  </div>
                  <div className="details_user d-flex flex-column">
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                    <div className="email">Enterprise Collaborator</div>
                  </div>
                </div>
                <div className="col-2 col-sm-4 d-flex align-items-center justify-content-end">
                  <img
                    src={reinvite}
                    alt="image"
                    width="38px"
                    className="image-icon"
                    onLoad={() => {}}
                    onClick={() => {
                      onClick(user.email);
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

export default DeletedUsers;
