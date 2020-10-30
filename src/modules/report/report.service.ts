import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { toArray, mergeMap } from 'rxjs/operators';
import { IPReport, IPReportServices, IPReportServiceURL } from './report.types';
import { fork } from 'child_process';
import { ReportResponse } from './report.worker';

const PROCESS_DELAY = 5000;
const MAX_ATTEMPTS = 2;

@Injectable()
export class ReportService {
  public generateMultipleReport(
    ip: string,
    ipReportServices: IPReportServices[],
  ): Observable<IPReport[]> {
    return from(ipReportServices).pipe(
      mergeMap(ipReportService =>
        this.generateIPReport(
          ip,
          ipReportService,
          this.getReportServiceUrl(ipReportService),
          MAX_ATTEMPTS,
        ),
      ),
      toArray(),
    );
  }

  private getReportServiceUrl(
    reportService: IPReportServices,
  ): IPReportServiceURL {
    switch (reportService) {
      case IPReportServices.Freegeoip:
        return IPReportServiceURL.Freegeoip;
      case IPReportServices.Ipapi:
        return IPReportServiceURL.Ipapi;
      default:
        return null;
    }
  }

  private generateIPReport(
    ip: string,
    reportService: IPReportServices,
    reportServiceUrl: IPReportServiceURL,
    retryAttempts: number = 0,
  ): Observable<IPReport> {
    return new Observable(observer => {
      // Since we are using typescript we need to point the
      // fork module route to our dist folder in order to get the JS file.
      const worker = fork(
        './dist/modules/report/report.worker.js',
        [
          reportServiceUrl.replace('{ip}', ip),
          PROCESS_DELAY.toString(),
          retryAttempts.toString(),
        ],
        {},
      );
      worker.on('message', (response: ReportResponse) => {
        observer.next({
          reportService,
          data: {
            ip: response.ip,
            countryCode: response.country_code,
            countryName: response.country_name,
            regionCode: response.region_code,
          },
        });
      });
      worker.on('exit', e => {
        if (e) {
          observer.next({
            reportService,
            data: null,
          });
        }
        observer.complete();
      });
      worker.on('error', e => {
        observer.error(e);
      });
    });
  }
}
