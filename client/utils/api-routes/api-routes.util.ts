import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax";
import { catchError, map } from "rxjs/operators";
import history from "../history";

const baseURL = "//dev.mpartial.io:8080";

const requestHeader = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  let token: string | boolean = false;

  if (localStorage.token) {
    token = localStorage.token;
  }
  if (token) {
    // headers['thetoken'] = localStorage.token;
  }

  return headers;
};

const handleError = (operation: string) => (err: any) => {
  const errMsg = `Error in ${operation}()`;
  //console.log(`${errMsg}:`, err);

  if (err.status === 401) {
    localStorage.clear();
    history.push("/login");
  }

  if (err.status === 503) {
    //console.log(err.message);
    //console.log(err.request);
    //console.log(err.response);
    //console.log(err.responseType);
    //console.log(err.status);
  }

  return Observable.throw(errMsg);
};

const afterRes = () => {}

export const auth = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/isAValidToken?authToken=${
      localStorage.token
    }&type=${"client"}`,
  }).pipe(
    catchError(handleError("auth")),
    
  );
};

export const login = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/loginWithEmailAndPassword?emailaddress=${payload.username}&password=${payload.password}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const signup1 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/RegisterNewCustomerStep1?emailaddress=${payload.emailaddress}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const signup2 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/RegisterNewCustomerStep2?emailaddress=${payload.emailaddress}&firstname=${payload.firstname}&lastname=${payload.lastname}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const signup3 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/RegisterNewCustomerStep3?emailaddress=${payload.emailaddress}&phonenumber=${payload.phonenumber}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const signup4 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/RegisterNewCustomerStep4?emailaddress=${payload.emailaddress}&role=${payload.role}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const signup5 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/RegisterNewCustomerStep5?emailaddress=${payload.emailaddress}&role=${payload.role}&password=${payload.password}&firstname=${payload.firstname}&lastname=${payload.lastname}&phonenumber=${payload.phonenumber}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const saveOrderData = (payload, apiData) => {
  return ajax({
    method: "POST",
    url: `${baseURL}/Client/saveOrderData?${apiData}`,
    body: payload,
  }).pipe(
    catchError(handleError("claimForm")),
    
  );
};

export const profileUpdate = (payload, apiData) => {
  return ajax({
    method: "POST",
    url: `${baseURL}/Client/updateCustomerInfo?${apiData}`,
    body: payload,
  }).pipe(
    catchError(handleError("claimForm")),
    
  );
};

export const changePassword = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/changeCustomerPassword?${payload}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};
export const resetPasswordWithToken = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/ResetPasswordWithToken?${payload}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const ActivateAccountAPI = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/ConfirmEmail?${payload}`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const payOrder = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/payForOrder?status=${payload.status}&orderId=${
      payload.orderId
    }&fullresponse=${encodeURIComponent(payload.fullresponse)}&thetoken=${
      localStorage.token
    }`,
  }).pipe(
    catchError(handleError("login")),
    
  );
};

export const forgotPasswordAPI = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/forgotPassword?emailaddress=${payload.emailaddress}`,
  }).pipe(
    catchError(handleError("logout")),
    
  );
};

export const sendEmail = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/contactus?yourname=${payload.yourname}&email=${payload.email}&phonenumber=${payload.phonenumber}&message=${payload.message}`,
  }).pipe(
    catchError(handleError("logout")),
    
  );
};

export const logoutAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/logout?thetoken=${localStorage.token}`,
  }).pipe(
    catchError(handleError("logout")),
    
  );
};

export const getMyOrdersAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/getOrders?thetoken=${localStorage.token}`,
  }).pipe(
    catchError(handleError("logout")),
    
  );
};

export const getMyInfoAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Client/getCustomerInfo?thetoken=${localStorage.token}`,
  }).pipe(
    catchError(handleError("logout")),
    
  );
};

export const resetPassword = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/reset_password`,
    body: payload,
  }).pipe(
    catchError(handleError("resetPassword")),
    
  );
};

export const getBoardData = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/getAllBoards`,
  }).pipe(
    catchError(handleError("getBoardData")),
    
  );
};

export const updateBoardData = (payload, id) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/updateBoardData?boardId=${id}`,
    body: payload,
  }).pipe(
    catchError(handleError("getBoardData")),
    
  );
};

export const getUsers = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetAllUsers`,
    body: payload,
  }).pipe(
    catchError(handleError("GetAllUsers")),
    
  );
};

export const GetAllRoles = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetAllRoles`,
    body: payload,
  }).pipe(
    catchError(handleError("GetAllUsers")),
    
  );
};

export const GetAllPrivileges = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetAllPrivileges`,
    body: payload,
  }).pipe(
    catchError(handleError("GetAllUsers")),
    
  );
};

export const claimForm = (payload, apiData) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/addCardFromForm?boardId=${apiData.boardId}&cardTitle=${
      apiData.cardTitle
    }&description=${apiData.description}&otherData=${JSON.stringify(
      apiData.otherData
    )}&label=${JSON.stringify(apiData.label)}`,
    body: payload,
  }).pipe(
    catchError(handleError("claimForm")),
    
  );
};

export const getServerTime = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetServerTime`,
  }).pipe(
    catchError(handleError("getServerTime")),
    
  );
};
