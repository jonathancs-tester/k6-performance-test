export function testType(type,tags){
    if(type == 'smoke'){
        var config_test = {
            vus: `${__ENV.VUS}`, 
            duration: `${__ENV.DURATION}`,
            thresholds: {
              get_success_rate: [`rate >= ${__ENV.SUCCESS_RATE_THRESHOLDS}`], 
              get_duration: [`p(95) <= ${__ENV.TIME_DURATION_THRESHOLDS}`], 
              get_requests: [`count >= ${__ENV.VUS}`], 
            },
            tags: tags
        }
    }else if (type == 'load'){
        var config_test = {
            stages: [
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}` }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}` }, 
                { duration: `${__ENV.RAMPDOWN}`, target: 0 }, 
            ],
            thresholds: {
              get_success_rate: [`rate >= ${__ENV.SUCCESS_RATE_THRESHOLDS}`], 
              get_duration: [`p(95) <= ${__ENV.TIME_DURATION_THRESHOLDS}`], 
              get_requests: [`count >= ${__ENV.VUS}`], 
            },
            tags: tags
        }
    }else if(type == 'stress'){
        var config_test = {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 500,
            timeUnit: "1s",
            stages: [
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}` }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}` },
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}`*2 }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}`*2 },
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}`*3 }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}`*3 },
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}`*4 }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}`*4 },
                { duration: `${__ENV.RAMPDOWN}`, target: 0 }, 
            ],
            thresholds: {
              get_success_rate: [`rate >= ${__ENV.SUCCESS_RATE_THRESHOLDS}`], 
              get_duration: [`p(95) <= ${__ENV.TIME_DURATION_THRESHOLDS}`], 
              get_requests: [`count >= ${__ENV.VUS}`], 
            },
            tags: tags
        }
    }else if(type == 'spike'){
        var config_test = {
            scenarios: {
                contacts: {
                    executor: 'per-vu-iterations',
                    vus: `${__ENV.VUS}`,
                    iterations: `${__ENV.ITER}`,
                    maxDuration: `${__ENV.DURATION}`,
                },
            },
            thresholds: {
              get_success_rate: [`rate >= ${__ENV.SUCCESS_RATE_THRESHOLDS}`], 
              get_duration: [`p(95) <= ${__ENV.TIME_DURATION_THRESHOLDS}`], 
              get_requests: [`count >= ${__ENV.VUS}`], 
            },
            tags: tags
        }
    }else if(type == 'soak'){
        var config_test = {
            stages: [
                { duration: `${__ENV.RAMPUP}`, target: `${__ENV.VUS}` }, 
                { duration: `${__ENV.DURATION}`, target: `${__ENV.VUS}` }, 
                { duration: `${__ENV.RAMPDOWN}`, target: 0 }, 
            ],
            thresholds: {
              get_success_rate: [`rate >= ${__ENV.SUCCESS_RATE_THRESHOLDS}`], 
              get_duration: [`p(95) <= ${__ENV.TIME_DURATION_THRESHOLDS}`], 
              get_requests: [`count >= ${__ENV.VUS}`], 
            },
            tags: tags
        }
    }

    return config_test
}