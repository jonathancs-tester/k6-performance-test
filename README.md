# k6-performance-test
This project is used to test the reliability and performance of your systems and catch performance regressions and problems earlier. k6 will help you to build resilient and performant applications that scale.

## Installation and OS fine-tuning

### Installation

```bash
    https://k6.io/docs/get-started/installation/
```

### OS fine-tuning

The following OS changes allow k6 to use the full network capacity of the machine for maximum performance. Enter admin mode and execute commands below:


```bash
    sysctl -w net.ipv4.ip_local_port_range="1024 65535"
    sysctl -w net.ipv4.tcp_tw_reuse=1
    sysctl -w net.ipv4.tcp_timestamps=1
    ulimit -n 250000
```

## Environments Variables

To run this project, you will need to add the following environment variables to your .env

##### CONFIG

`PROJECT`: project name of the test execution, i.e, project, project1 and, project2.

`TEST_TYPE`: 

- smoke: verify that your system can handle minimal load, without any problems.
- load: assess system performance in terms of concurrent users or requests per second.
- stress and spike: assess the limits and stability of your system under extreme conditions.
- soak: assess the reliability and performance of your system over an extended period of time.

`VUS`: A number specifying the number of Virtual Users to run concurrently.

`ITER`: A number specifying a fixed number of iterations to execute of the script; together with the vus option, it's a shortcut for a single scenario with a shared iterations executor.

`TIMEOUT`: Maximum time to wait for the request to complete. Default timeout is 60 seconds 

`RAMPUP`: the amount of time to add all VUs to a test execution

`DURATION`: A string specifying the total duration of the test run; together with the vus option, it's a shortcut for a single scenario with a constant VUs executor.

`RAMPDOWN`: the amount of time to remove all VUs to a test execution

`BASEURL`: defines absolute path depending on your server, i.e, api.publicapis.org. 

##### THRESHOLDS

`SUCCESS_RATE_THRESHOLDS`: Thresholds are the pass/fail criteria that you define for your test metrics. This criteria is success rate above this parameter.

`TIME_DURATION_THRESHOLDS`: Thresholds are the pass/fail criteria that you define for your test metrics. This criteria is 95% time duration below this parameter.

##### TAGS

`FEATURE`: k6 script file is used to run in project

##### AUTH0

`AUTH_DOMAIN`: defines absolute path depending on your Auth0.

`AUTH_AUDIENCE`: either the application ( Client ID ) for an ID Token or the API that is being called ( API Identifier ) for an Access Token.

`AUTH_CLIENT_ID`: identification value given to your registered resource from Auth0.

`AUTH_CLIENT_SECRET`: secret used by a client (application) to authenticate with the Authorization Server

`AUTH_SCOPE`: mechanism that defines the specific actions applications can be allowed to do or information that they can request on a user’s behalf

`AUTH_TOKEN`: an HTTP authentication scheme that involves security tokens called bearer tokens.

`AUTH_USER`: user email to access aplication

`AUTH_PWD`: user password to access aplication

`AUTH_OTP`: it's a temporary, secure PIN-code sent to you via SMS or e-mail that is valid only for one session. 


## Local Running

Clone the project

```bash
  git clone https://github.com/jonathancs-tester/k6-performance-test.git
```

Enter the project directory

```bash
  cd k6-performance-test/test
```

Install the dependencies

```bash
  npm install --no-save
```

Run the local script

```bash
  k6 run k6-script.js --http-debug |& tee -a console.log
```

## Reference

 - [k6 Docs](https://k6.io/docs/)
