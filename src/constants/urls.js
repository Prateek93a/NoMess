const BASE_URL = 'http://ec2-3-23-96-26.us-east-2.compute.amazonaws.com:8000/api/v1/auth';

export const LOGIN_URL = BASE_URL + '/login/';
export const LOGOUT_URL = BASE_URL + '/logout/';
export const PASSWORD_CHANGE = BASE_URL + '/password/change/';
export const PASSWORD_RESET = BASE_URL + '/password/reset';
export const PASSWORD_RESET_CONFIRM = BASE_URL + '/password/reset/confirm';
export const REGISTER = BASE_URL + '/register/';
export const REGISTER_VERIFY_EMAIL = BASE_URL + '/register/verify-email/';
export const USER = BASE_URL + '/user/';