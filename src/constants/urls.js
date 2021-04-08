const BASE_URL =
  'http://ec2-3-23-96-26.us-east-2.compute.amazonaws.com:8000/api/v1/auth';
const API_URL =
  'http://ec2-3-23-96-26.us-east-2.compute.amazonaws.com:8000/api/v1';

export const LOGIN_URL = BASE_URL + '/login/';
export const LOGOUT_URL = BASE_URL + '/logout/';
export const PASSWORD_CHANGE = BASE_URL + '/password/change/';
export const PASSWORD_RESET = BASE_URL + '/password/reset';
export const PASSWORD_RESET_CONFIRM = BASE_URL + '/password/reset/confirm';
export const REGISTER = BASE_URL + '/register/';
export const REGISTER_VERIFY_EMAIL = BASE_URL + '/register/verify-email/';
export const USER = BASE_URL + '/user/';
export const USER_MODE_CHANGE = BASE_URL + '/user/update/mode/';
export const REQUEST_COUPON = API_URL + '/coupon/buy/request/';
export const CONFIRM_COUPON_PAYMENT = API_URL + '/coupon/buy/confirm/';
export const COMPLAINT_FETCH = API_URL + '/complaint/';
export const COMPLAINT_POST = API_URL + '/complaint/';
export const COMPLAINT_RESOLVE = API_URL + '/complaint/resolve/';
export const LEAVE_FETCH = API_URL + '/leave/';
export const LEAVE_POST = API_URL + '/leave/';
export const LEAVE_APPROVE = API_URL + '/leave/approve/';
export const COUPON_LIST = API_URL + '/coupon/';
export const COUPON_VERIFY = API_URL + '/coupon/spend/';
export const BILL_FETCH = API_URL + '/bill/';
export const BILL_REPORT = API_URL + '/bill/report/';
export const BILL_GENERATE = API_URL + '/bill/generate/';
export const BILL_REQUEST = API_URL + '/bill/pay/request/';
export const BILL_CONFIRM = API_URL + '/bill/pay/confirm/';
export const BILL_MODE_UPDATE = BASE_URL + '/user/update/mode/';
