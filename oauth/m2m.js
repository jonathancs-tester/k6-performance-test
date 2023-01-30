import { check, sleep } from 'k6';
import http from 'k6/http';

var auth_body = {
	grant_type: 'client_credentials',
	client_secret: `${__ENV.AUTH_CLIENT_SECRET}`,
	audience: `${__ENV.AUTH_AUDIENCE}`,
	client_id: `${__ENV.AUTH_CLIENT_ID}`
};

var params = {
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: `${__ENV.TIMEOUT}`
};

export function Auth0M2M(){
	// Login Auth0 request
	const login_response = http.post(`https://${__ENV.AUTH_DOMAIN}/oauth/token`, auth_body);
	check(login_response, {
		'is status 200': (r) => r.status === 200,
		'is access_token present': (r) => r.json().hasOwnProperty('access_token'),
	});
	params.headers['Authorization'] = `Bearer ${login_response.json()['access_token']}`;

	sleep(1);
	return params;
}