import React, { useEffect, useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import image from "../../../../assets/userProfile.svg";
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
  const[message, setMessage] = useState('Do you want to delete the user?')


  const deleteUser = () => {

        removeChildAccount(toRemove).subscribe((response) => {
      if (response.response.Requested_Action) {
        setMessage('User Deleted!')
        setEmail("");
        handleShow();

      }
      getMyInvitedUser();
    });
  };
  const InviteUser = (email) => {
    resendInvite(email).subscribe((response) => {
      if (response.response.Requested_Action) {
        setMessage('Invitation Sent')
        handleShow();
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

props.setRefresh(1)
  props.setPendingCount(filteredUsers.length)

  return (
    
    <div>
    

      <Modal show={modal} onHide={handleClose} className="cancel_subscription">
      { message === 'Do you want to delete the user?' ?
    <Modal.Header toggle={handleClose}>Alert</Modal.Header> : ('')}
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={() => {
            handleClose();
            setMessage('Do you want to delete the user?');
          }}>
            Cancel{" "}
          </button>{" "}
          { message === 'Do you want to delete the user?' ?
          <button
            className="btn"
            onClick={() => {
              deleteUser();
              handleClose();
            }}
          >
            Delete
          </button>
          : ('')
}
        </Modal.Footer>
      </Modal>
      <div className="manager_users">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, i) => (
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
                    width="38px"
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
                    width="38px"
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

export default PendingUsers;
