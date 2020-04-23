import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { catchError } from 'rxjs/operators';
import history from '../history';

const baseURL = 'http://dev.mpartial.io:9000';

const requestHeader = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  let token: string | boolean = false;

  if (localStorage.token) {
    token = localStorage.token;
  }
  if (token) {
    headers['authString'] = localStorage.token;
  }else {
    headers['authString'] = '17d26ca06932e52bbac7f1e0be00227d';
  }

  return headers;
};

const handleError = (operation: string) => (err: any) => {
  const errMsg = `Error in ${operation}()`;
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

  return Observable.throw(errMsg);
};

export const auth = () =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/isValidToken`,
  }).pipe(catchError(handleError('auth')));

export const login = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/AdminLogin?username=${payload.username}&password=${payload.password}`,
  }).pipe(catchError(handleError('login')));

export const logoutAPI = () =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/logout`,
  }).pipe(catchError(handleError('logout')));

export const resetPassword = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/reset_password`,
    body: payload,
  }).pipe(catchError(handleError('resetPassword')));

export const getBoardData = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/getAllBoards`,
  }).pipe(catchError(handleError('getBoardData')));

export const updateBoardData = (payload, id) =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/updateBoardData?boardId=${id}`,
    body: payload,
  }).pipe(catchError(handleError('getBoardData')));


  export const getUsers = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/GetAllUsers`,
    body: payload,
  }).pipe(catchError(handleError('GetAllUsers')));

  export const GetAllRoles = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/GetAllRoles`,
    body: payload,
  }).pipe(catchError(handleError('GetAllUsers')));


  export const GetAllPrivileges = payload =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/GetAllPrivileges`,
    body: payload,
  }).pipe(catchError(handleError('GetAllUsers')));




  export const claimForm = (payload, apiData) =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/addCardFromForm?boardId=${apiData.boardId}&cardTitle=${apiData.cardTitle}&description=${apiData.description}&otherData=${encodeURIComponent(JSON.stringify(apiData.otherData))}&label=${JSON.stringify(apiData.label)}`,
    body: payload,
  }).pipe(catchError(handleError('claimForm')));



  export const getServerTime = () =>
  ajax({
    headers: requestHeader(),
    method: 'POST',
    url: `${baseURL}/GIServer/GetServerTime`,
  }).pipe(catchError(handleError('getServerTime')));


  
  