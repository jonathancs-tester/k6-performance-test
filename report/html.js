import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function generateHtml(data){
    var report = {
	    html: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };

    report[`results/${__ENV.FEATURE}${__ENV.TEST_TYPE}.html`] = report['html'];
    delete report['html']

    return report
}