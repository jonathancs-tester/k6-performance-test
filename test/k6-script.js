  import http from 'k6/http';
  import exec from 'k6/execution';
  import { Trend, Rate, Counter } from 'k6/metrics';
  import { group, sleep } from 'k6';
  import { Auth0M2M } from '../oauth/m2m.js';
  import { Auth0MFA } from '../oauth/mfa.js';
  import { Auth0API } from '../oauth/api.js';
  import { Auth0Token } from '../oauth/token.js';
  import { generateHtml } from '../report/html.js';
  import { testType } from '../config/config.js';

  let baseurl = `${__ENV.BASEURL}`

  export let GetDuration = new Trend('get_duration')
  export let GetFailRate = new Rate('get_fail_rate')
  export let GetSuccessRate = new Rate('get_success_rate')
  export let GetReqs = new Counter('get_requests')

  var tags = {
    feature: `${__ENV.FEATURE}`,
  };

  export const options = testType(`${__ENV.TEST_TYPE}`,tags)

  export function setup() {

    if(`${__ENV.AUTH_METHOD}` == 'M2M')
      var params = Auth0M2M()
    else if(`${__ENV.AUTH_METHOD}` == 'MFA')
      var params = Auth0MFA()
    else if(`${__ENV.AUTH_METHOD}` == 'API')
      var params = Auth0API()
    else if(`${__ENV.AUTH_METHOD}` == 'TOKEN')
      var params = Auth0Token()

    return params;
  }

  export default function (params) {
    if(exec.vu.tags['feature'] == 'test'){
        group('GET entries open API',() => {
          let response = http.get(
            'https://'+baseurl+'/entries',
            fd.body(), params);

          GetDuration.add(response.timings.duration)
          GetReqs.add(1)
          GetFailRate.add(response.status == 0 || response.status >= 300)
          GetSuccessRate.add(response.status != 0 && response.status >= 200 && response.status <= 300)

        });
      }
  sleep(1);
}

export function handleSummary(data) {
  return generateHtml(data)
}