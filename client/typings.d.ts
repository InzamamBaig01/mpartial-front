/**
 * Typescript File Recogntion
 */
declare module '*.css';
declare module '*.scss';
declare module '*.json';
declare module '*.svg' {
  const content: any;
  export default content;
}


// * Configurations

interface RouteConfig {
    component?: React.ComponentClass | React.FC<T>;
    isExact?: boolean;
    isPublic?: boolean;
    path: string;
    slug: string;
    title: string;
    redirectTo?: string;
    routes?: RouteConfig[];
}



type HttpRequestStatus = 'pending' | 'success' | 'error';

  
interface User {
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}


interface LoginPayload {
  email: string;
  password: string;
}


interface alertDetails {
  isShowAlert: boolean;
  isTimely: boolean;
  message: string;
  alertType: string;
}
