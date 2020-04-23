import * as React from "react";
import { login, logoutAPI, auth } from "../utils/api-routes/api-routes.util";
import history from "../utils/history";
import { useState } from "react";

interface IContextProps {
  profile: object;
  payload: object;
  loginError: string | undefined;
  isAuthenticated: boolean;
  status: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;
  isValid: boolean;
  dispatchLogin: Function;
  emailOnChange: Function;
  passwordOnChange: Function;
  isUserAuthenticated: Function;
  logout: Function;
  setPageIsPublicValue: Function;
  pageIsPublic: any;
  userDetails: Function;
}

export const AuthContext = React.createContext({} as IContextProps);

// TODO: Move to typings file
interface ProfileStorage {
  token: string;
}

export default React.memo(({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageIsPublic, setPageIsPublic] = useState(undefined);

  let profile: ProfileStorage = { token: "" };

  let payload = React.useMemo(() => {
    return { username: "", password: "" };
  }, []);

  let emailError = "";

  let passwordError = "";

  let isValid = false;

  React.useEffect(() => {
    // console.log("pageIsPublic",pageIsPublic);
    if (pageIsPublic !== undefined && !pageIsPublic) {
      auth().subscribe(
        (response: any) => {
          if (response.response.Requested_Action) {
          } else {
            logout();
          }
        },
        response => {
          logout();
        }
      );
    }
  }, [pageIsPublic]);


  const setPageIsPublicValue = (value: boolean) => {
    setPageIsPublic(value);
  }

  const emailOnChange = (id: string) => {
    payload.username = id;
    //  validateEmail();
  };

  const validateEmail = () => {
    const emailPatter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const required = payload.username ? undefined : "Required";
    //  emailError = required || (emailPatter.test(payload.username) ? undefined : 'Invalid email address');
  };

  const passwordOnChange = (pwd: string) => {
    payload.password = pwd;
    //  validatePassword();
  };

  const isUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };

  const userDetails = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      return profile;
    }
    return false;
  }

  const dispatchLogin = () => {
    setStatus("pending");

    login(payload).subscribe(
      (response: any) => {
        if (!response.response.Requested_Action) {
          setLoginError(response.response.Message);
          setStatus("error");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setStatus("success");
          //console.log(response)
          profile = response.response.objApplicationUserDTO;
          localStorage.setItem("profile", JSON.stringify(profile));
          localStorage.setItem("token", profile.token);
          history.push("/profile");
        }
        //console.log(status);
      },
      response => {
        setIsAuthenticated(false);
        setLoginError(response.response.Message);
        setStatus("error");
      }
    );
  };

  const logout = () => {
    logoutAPI().subscribe(
      (response: any) => {
        setStatus("success");
        setIsAuthenticated(false);
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        history.push("/login");
      },
      response => {
        setIsAuthenticated(false);
        setLoginError(response.response.Message);
        setStatus("error");
      }
    );
  };

  const defaultContext = {
    profile,
    payload,
    loginError,
    isAuthenticated,
    status,
    emailError,
    passwordError,
    isValid,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
    isUserAuthenticated,
    logout,
    setPageIsPublicValue,
    userDetails,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
});
