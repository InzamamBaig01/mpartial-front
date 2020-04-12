import * as React from "react";
import { getUsers, GetAllRoles, GetAllPrivileges } from "../utils/api-routes/api-routes.util";
import { useState } from "react";
import * as jsoncompare from 'js-object-compare';

interface IContextProps {
  dispatchGetUsers: Function;
  users: any;
  roles: any;
  dispatchGetAllRoles: Function;
  privileges: any;
  dispatchGetAllPrivileges: Function;
}

export const BackofficeContext = React.createContext({} as IContextProps);

export default ({ children }) => {


  const [users, setUsers] = useState([]);

  const [roles, setRoles] = useState([]);

  const [privileges, setPrivileges] = useState([]);
  

  const dispatchGetUsers = () => {
    getUsers({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setUsers(response.response.data);
        } else {
          //console.log(response);
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };


  const dispatchGetAllRoles = () => {
    GetAllRoles({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setRoles(response.response.data);
        } else {
          //console.log(response);
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };


  const dispatchGetAllPrivileges = () => {
    GetAllPrivileges({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setPrivileges(response.response.data);
        } else {
          //console.log(response);
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };

  
  const defaultContext = {
    dispatchGetUsers,
    users,
    dispatchGetAllRoles,
    roles,
    dispatchGetAllPrivileges,
    privileges,
  };

  return (
    <BackofficeContext.Provider value={defaultContext}>{children}</BackofficeContext.Provider>
  );
};
