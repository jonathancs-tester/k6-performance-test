import { check, sleep } from 'k6';
import http from 'k6/http';
import { getToken } from "../utils/otp.js";

var auth_url = `${__ENV.AUTH_DOMAIN}`
var otp_token = `${__ENV.AUTH_OTP}`

var auth_body = {
  grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
  otp: '',
  mfa_token: '',
  client_id: `${__ENV.AUTH_CLIENT_ID}`
};

var mfa_body = {
  grant_type: 'password',
  username: `${__ENV.AUTH_USER}`,
  password: `${__ENV.AUTH_PWD}`,
  audience: `${__ENV.AUTH_AUDIENCE}`,
  client_id: `${__ENV.AUTH_CLIENT_ID}`
};

var otp_body = {
  authenticator_types: ["otp"]
};

var params_otp = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var params = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function Auth0MFA(){
  // Login Auth0 request
  const response_mfa_token = http.post('https://'+auth_url+'/oauth/token', JSON.stringify(mfa_body), params_otp);
  params_otp.headers['Authorization'] = `Bearer ${response_mfa_token.json()['mfa_token']}`;

  const response_otp_token = http.post('https://'+auth_url+'/mfa/associate', JSON.stringify(otp_body), params_otp);

  if ((`${response_otp_token.json()['error_description']}`) == "User is already enrolled.")
    var secret = otp_token
  else
    var secret = `${response_otp_token.json()['secret']}`

  const otp = getToken(secret)
  auth_body.otp = otp
  auth_body.mfa_token = `${response_mfa_token.json()['mfa_token']}`
  
  const login_response = http.post('https://'+auth_url+'/oauth/token', JSON.stringify(auth_body), params);

  check(login_response, {
   'is status 200': (r) => r.status === 200,
   'is access_token present': (r) => r.json().hasOwnProperty('access_token'),
  });
  params.headers['Authorization'] = `Bearer ${login_response.json()['access_token']}`;

  sleep(1);
  return params;
}