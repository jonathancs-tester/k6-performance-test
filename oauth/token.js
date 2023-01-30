import { sleep } from 'k6';

var params = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function Auth0Token(){
  params.headers['Authorization'] = `Bearer ${__ENV.AUTH_TOKEN}`;
  sleep(1);
  return params;
}