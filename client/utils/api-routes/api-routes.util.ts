import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { catchError, map } from 'rxjs/operators';
import history from '../history';
import appConfig from '../../appconfig.json';
const baseURL = appConfig.API;

const requestHeader = () => {
  const headers = {
    'Content-Type': 'application/json',
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

const handleError = (tokenCheck: string) => (err: any) => {
  const errMsg = `Error in `;
  //console.log(`${errMsg}:`, err);

  if (err.status === 401) {
    localStorage.clear();
    history.push('/login');
  }

  if (err.status === 503) {
    //console.log(err.message);
    //console.log(err.request);
    //console.log(err.response);
    //console.log(err.responseType);
    //console.log(err.status);
  }
  if (tokenCheck == 'tokenCheck') {
    console.log('tokenCheck');
  }

  return Observable.throw(errMsg);
};

const afterRes = () => {};

export const auth = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/isAValidToken?authToken=${
      localStorage.token
    }&type=${'client'}`,
  }).pipe(catchError(handleError('')));
};

export const adAuth = () => {
  return ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}//GIServer/isValidToken?authString=${
      localStorage.topen
    }&type=${'client'}`,
  }).pipe(catchError(handleError('')));
};

export const allADOrders = () =>
  ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}/GIServer/getAllOrders`,
  }).pipe(catchError(handleError('')));

export const allADUsers = () =>
  ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}/GIServer/getAllCustomers`,
  }).pipe(catchError(handleError('')));

export const deleteCoupon = (payload) =>
  ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}/GIServer/deleteCoupon?thetoken=${localStorage.topen}&couponId=${payload.id}`,
  }).pipe(catchError(handleError('')));

export const updateStatus = (payload) =>
  ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}/GIServer/updateOrderStatus?orderId=${payload.orderId}&orderStatus=${payload.orderStatus}`,
  }).pipe(catchError(handleError('')));

export const addCoupon = (payload) =>
  ajax({
    headers: {
      authString: localStorage.topen,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: `${baseURL}/GIServer/addcoupon`,
    body: payload,
  }).pipe(catchError(handleError('')));

export const editCoupon = (payload) =>
  ajax({
    headers: {
      authString: localStorage.topen,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: `${baseURL}/GIServer/editcoupon?couponId=${payload.couponId}&iscouponActive=${payload.isCouponActive}`,
  }).pipe(catchError(handleError('')));

export const getAllCoupon = () =>
  ajax({
    headers: {
      authString: localStorage.topen,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: `${baseURL}/GIServer/getAllcoupons`,
  }).pipe(catchError(handleError('')));

export const couponUsageHistory = (payload) =>
  ajax({
    headers: {
      authString: localStorage.topen,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: `${baseURL}/GIServer/couponUsageHistory?couponId=${payload.couponId}`,
  }).pipe(catchError(handleError('')));

export const adLogin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/AdminLogin?username=${payload.username}&password=${payload.password}`,
  }).pipe(catchError(handleError('')));

export const login = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/loginWithEmailAndPassword?emailaddress=${payload.username}&password=${payload.password}`,
  }).pipe(catchError(handleError('')));
};

export const signup1 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/RegisterNewCustomerStep1?emailaddress=${payload.emailaddress}`,
  }).pipe(catchError(handleError('')));
};

export const signup2 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/RegisterNewCustomerStep2?emailaddress=${payload.emailaddress}&firstname=${payload.firstname}&lastname=${payload.lastname}`,
  }).pipe(catchError(handleError('')));
};

export const signup3 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/RegisterNewCustomerStep3?emailaddress=${payload.emailaddress}&phonenumber=${payload.phonenumber}`,
  }).pipe(catchError(handleError('')));
};

export const signup4 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/RegisterNewCustomerStep4?emailaddress=${payload.emailaddress}&role=${payload.role}`,
  }).pipe(catchError(handleError('')));
};

export const signup5 = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/RegisterNewCustomerStep5?emailaddress=${payload.emailaddress}&role=${payload.role}&password=${payload.password}&firstname=${payload.firstname}&lastname=${payload.lastname}&phonenumber=${payload.phonenumber}`,
  }).pipe(catchError(handleError('')));
};

export const saveOrderData = (payload, apiData) => {
  return ajax({
    method: 'POST',
    url: `${baseURL}/Client/saveOrUpdateOrderData?${apiData}`,
    body: payload,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const saveFileOrderData = (payload, apiData) => {
  return ajax({
    method: 'POST',
    url: `${baseURL}/Client/addFileToOrder?orderId=${apiData.orderId}&thetoken=${localStorage.token}`,
    body: payload,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const profileUpdate = (payload, apiData) => {
  return ajax({
    method: 'POST',
    url: `${baseURL}/Client/updateCustomerInfo?${apiData}`,
    body: payload,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const changePassword = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/changeCustomerPassword?${payload}`,
  }).pipe(catchError(handleError('')));
};
export const resetPasswordWithToken = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/ResetPasswordWithToken?${payload}`,
  }).pipe(catchError(handleError('')));
};

export const ActivateAccountAPI = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/ConfirmEmail?${payload}`,
  }).pipe(catchError(handleError('')));
};

export const payOrder = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/payForOrder?status=${payload.status}&orderId=${
      payload.orderId
    }&fullresponse=${encodeURIComponent(payload.fullresponse)}&thetoken=${
      localStorage.token
    }`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const delDraft = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/deleteDraft?orderId=${payload.id}&thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const forgotPasswordAPI = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/forgotPassword?emailaddress=${payload.emailaddress}`,
  }).pipe(catchError(handleError('')));
};
export const resendActivationEmail = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/resendActivationEmail?emailaddress=${payload.emailaddress}`,
  }).pipe(catchError(handleError('')));
};

export const sendEmail = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/contactus?yourname=${payload.yourname}&email=${payload.email}&phonenumber=${payload.phonenumber}&message=${payload.message}`,
  }).pipe(catchError(handleError('')));
};

export const logoutAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/logout?thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('')));
};

export const adLogoutAPI = () => {
  return ajax({
    headers: {
      authString: localStorage.topen,
    },
    method: 'POST',
    url: `${baseURL}/GIServer/logout?authString=${localStorage.topen}`,
  }).pipe(catchError(handleError('')));
};

export const getMyOrdersAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/getOrders?thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const getMyInfoAPI = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/getCustomerInfo?thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const getPIC = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/getSetupIntentForAddingCard?thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const applyCoupons = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/applycoupon?thetoken=${localStorage.token}&orderId=${payload.orderId}&couponCode=${payload.coupon}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const setDefaultPaymentMenthod = (pmId) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/setDefaultPaymentMenthod?thetoken=${localStorage.token}&pmId=${pmId}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const getDefaultPaymentMenthod = () => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/getDefaultPaymentMenthod?thetoken=${localStorage.token}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const deletePaymentMenthod = (pmId) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/deletePaymentMenthod?thetoken=${localStorage.token}&pmId=${pmId}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const getPaymentIntendOfOrder = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/Client/getPaymentIntendOfOrder?thetoken=${localStorage.token}&orderId=${payload.orderId}`,
  }).pipe(catchError(handleError('tokenCheck')));
};

export const resetPassword = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/reset_password`,
    body: payload,
  }).pipe(catchError(handleError('')));
};
