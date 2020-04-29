import * as React from "react";
import {
  login,
  logoutAPI,
  auth,
  signup1,
  signup2,
  signup3,
  signup4,
  signup5,
} from "../utils/api-routes/api-routes.util";
import history from "../utils/history";
import { useState } from "react";
import { AppAlertsContext } from "./appAlertsContext";

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
  signupDetails: any;
  step1: Function;
  step2: Function;
  step3: Function;
  step4: Function;
  step5: Function;
  setLoginError: Function;
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
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  // console.log(showLoader);
  let profile: ProfileStorage = { token: "" };

  const [signupDetails, setSignupDetails] = useState({});

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
        (response) => {
          logout();
        }
      );
    }
  }, [pageIsPublic]);

  const setPageIsPublicValue = (value: boolean) => {
    setPageIsPublic(value);
  };

  const emailOnChange = (id: string) => {
    payload.username = id;
    //  validateEmail();
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
    const profile = localStorage.getItem("profile");
    if (profile && profile!= "undefined") {
      return JSON.parse(profile);
    } else {
      console.log(pageIsPublic);
      if (pageIsPublic !== undefined && !pageIsPublic) logout();
    }
    return false;
  };

  const dispatchLogin = () => {
    setStatus("pending");
    showLoader();
    setLoginError(false);
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
          profile = response.response.data;
          localStorage.setItem("profile", JSON.stringify(profile));
          localStorage.setItem("token", response.response.message);
          history.push("/");
        }
        hideLoader();
        //console.log(status);
      },
      (response) => {
        setIsAuthenticated(false);
        setLoginError(response.response.Message);
        setStatus("error");
        hideLoader();
      }
    );
  };

  const logout = () => {
    showLoader();
    logoutAPI().subscribe(
      (response: any) => {
        setStatus("success");
        setIsAuthenticated(false);
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        history.push("/login");
        hideLoader();
      },
      (response) => {
        setIsAuthenticated(false);
        setLoginError(response.response.Message);
        setStatus("error");
        hideLoader();
      }
    );
  };

  const step1 = (data) => {
    setSignupDetails({
      ...signupDetails,
      emailaddress: data.emailaddress,
    });
    return signup1(data);
  };

  const step2 = (data) => {
    setSignupDetails({
      ...signupDetails,
      firstname: data.firstname,
      lastname: data.lastname,
    });
    data.emailaddress = signupDetails.emailaddress;
    return signup2(data);
  };
  const step3 = (data) => {
    setSignupDetails({
      ...signupDetails,
      phonenumber: data.phonenumber,
    });
    data.emailaddress = signupDetails.emailaddress;
    return signup3(data);
  };
  const step4 = (data) => {
    setSignupDetails({
      ...signupDetails,
      role: data.role,
    });
    data.emailaddress = signupDetails.emailaddress;
    return signup4(data);
  };
  const step5 = (data) => {
    setSignupDetails({
      ...signupDetails,
      password: data.password,
    });
    data.emailaddress = signupDetails.emailaddress;
    return signup5(data);
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
    signupDetails,
    step1,
    step2,
    step3,
    step4,
    step5,
    setLoginError,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
});
