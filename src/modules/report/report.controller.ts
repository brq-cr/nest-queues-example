import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReportService } from './report.service';
import { IPReport, IPReportServices } from './report.types';

@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  // RPC (Remote Procedure Call) is prefered over REST due we are calling a procedure
  @Get('generateMultipleIpReport')
  generateMultipleIpReport(): Observable<IPReport[]> {
    return this.reportService.generateMultipleReport('8.8.8.8', [
      IPReportServices.Ipapi,
      IPReportServices.Freegeoip,
    ]);
  }
}
