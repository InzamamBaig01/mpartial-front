import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import ActiveUsers from "./_components/ActiveUsers";
import DeletedUsers from "./_components/DeletedUsers";
import history from "utils/history";
import Alert from "react-bootstrap/Alert";
import { inviteUsers } from "utils/api-routes/api-routes.util";
import { AppContext } from "contexts/appContext";

import queryString from "query-string";
import PendingUsers from "./_components/PendingUsers";

const ManageUsers = () => {
  const { getMyInfo, myInfo, getMyInvitedUser, invitedUsers } = useContext(
    AppContext
  );
  const [activeTab, setActiveTab] = useState({
    active: true,
    pending: false,
    deleted: false,
  });

  useEffect(() => {
    getMyInfo();
  }, []);

  const [formDetails, setFormDetails] = useState({
    toInvite: "",
    inviteMessage: "",
  });

  const [inviteMessage, setInviteMessage] = useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [variant, setVariant] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const stringified = queryString.stringify(formDetails);
    console.log(stringified, "asd");

    inviteUsers(stringified).subscribe((response) => {
      setInviteMessage(response.response.Message);
      setShow(true);

      if (response.response.Requested_Action) {
        setFormDetails({
          toInvite: "",
          inviteMessage: "",
        });
        getMyInvitedUser();
        setVariant(true);
      } else {
        setVariant(false);
      }
    });
    if (invitedUsers) {
      const filter = invitedUsers.filter(
        (user) => user.invitestatus === "Pending"
      );
      setPendingCount(filter.length);
    }
  };
  return (
    <>
      <Header isFixedColor={true}></Header>

      {!myInfo.ischildaccount && myInfo.subscriptionstatus === "Active" ? (
        <div className="other_pages_container">
          <h1 className="title text-center">Manage Users</h1>
          <div className="container ">
            <div className="row mt-5">
              <div
                className={
                  activeTab.active
                    ? "col-lg-2 col-4 active_section"
                    : "col-lg-2 col-4 faded"
                }
                onClick={() =>
                  setActiveTab({
                    active: true,
                    pending: false,
                    deleted: false,
                  })
                }
              >
                <p>Active ({activeCount})</p>
              </div>
              <div
                className={
                  activeTab.pending
                    ? "col-lg-2 col-4 active_section"
                    : "col-lg-2 col-4 faded"
                }
                onClick={() =>
                  setActiveTab({
                    active: false,
                    pending: true,
                    deleted: false,
                  })
                }
              >
                <p> Pending ({pendingCount}) </p>
              </div>
              <div
                className={
                  activeTab.deleted
                    ? "col-lg-2 col-4 active_section"
                    : "col-lg-2 col-4 faded"
                }
                onClick={() =>
                  setActiveTab({
                    active: false,
                    pending: false,
                    deleted: true,
                  })
                }
              >
                <p>Deleted ({deleteCount}) </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-8">
                {activeTab.active ? (
                  <ActiveUsers
                    setActiveCount={setActiveCount}
                    setPendingCount={setPendingCount}
                    setDeleteCount={setDeleteCount}
                  />
                ) : (
                  ""
                )}
                {activeTab.pending ? (
                  <PendingUsers
                    setPendingCount={setPendingCount}
                    email={formDetails.toInvite}
                  />
                ) : (
                  ""
                )}
                {activeTab.deleted ? (
                  <DeletedUsers
                    setActiveCount={setActiveCount}
                    setDeleteCount={setDeleteCount}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4">
                <div className="payment_section pl-2 pr-2">
                  <div className="payment_section_header ">
                    <div className="row ">
                      <div className="col text-left ">
                        <div className="payment_header_title">Invite Users</div>
                      </div>
                    </div>
                  </div>
                  <div className="payment_section_body cards subscription_cards">
                    {show ? (
                      <Alert
                        variant={variant ? "success" : "danger"}
                        onClose={() => setShow(false)}
                        dismissible
                      >
                        <Alert.Heading></Alert.Heading>

                        <p
                          style={{ alignItems: "center", padding: "60px 0px" }}
                        >
                          {inviteMessage}
                        </p>
                      </Alert>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="row mt-5 pl-2 pr-2">
                          <div className="col-lg-12">
                            <div className="text-left mb-1 label-text">
                              Email
                            </div>
                            <input
                              className="form-control"
                              type="email"
                              value={formDetails.toInvite}
                              required
                              onChange={(e) =>
                                setFormDetails({
                                  ...formDetails,
                                  toInvite: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-lg-12 mt-4">
                            <div className="text-left mb-1 label-text">
                              Invitation Message
                            </div>
                            <textarea
                              className="form-control"
                              value={formDetails.inviteMessage}
                              type="text"
                              onChange={(e) =>
                                setFormDetails({
                                  ...formDetails,
                                  inviteMessage: e.currentTarget.value,
                                })
                              }
                              style={{ resize: "none" }}
                            />
                          </div>
                          <div className="col-lg-12 mt-4">
                            <button className="btn">Send Invitation</button>
                          </div>
                        </div>
                      </form>
                    )}
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        history.push(`/profile`)
      )}
    </>
  );
};

export default withRouter(ManageUsers);
