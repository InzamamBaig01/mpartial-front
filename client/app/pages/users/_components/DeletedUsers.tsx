import React, { useEffect, useContext, useState } from "react";
import queryString from "query-string";
import Modal from "react-bootstrap/Modal";
import image from "../../../../assets/userProfile.svg";
import reinvite from "../../../../assets/reinvite.png";
import { inviteUsers } from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";

const DeletedUsers = (props) => {
  const { getMyInvitedUser, invitedUsers } = useContext(AppContext);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [toRemove, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const [formDetails, setFormDetails] = useState({
    toInvite: "",
    inviteMessage: "",
  });

  const onClick = () => {
    const stringified = queryString.stringify(formDetails);
    inviteUsers(stringified).subscribe((response) => {
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

  console.log('PROPS', props.email)

  useEffect(() => {
    const filter = invitedUsers.filter(
      (user) => user.invitestatus === "Deleted"
    );
    setFilteredUser(filter);

    const activeFilter = invitedUsers.filter(
      (user) => user.invitestatus === "Accepted"
    );
    props.setActiveCount(activeFilter.length)
  }, [invitedUsers]);

  props.setDeleteCount(filteredUsers.length)

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
                    src={reinvite}
                    alt="image"
                    width="38px"
                    onLoad={() => {
                      setFormDetails({
                        ...formDetails,
                        toInvite: user.email,
                      });
                    }}
                    onClick={() => {
                      onClick();
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
