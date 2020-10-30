import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { switchMap, toArray, map } from 'rxjs/operators';
import { ReportDto } from './report.dto';
import { ReportService } from './report.service';
import { Report } from './report.transformer';
import { IPReport } from './report.types';

@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  // RPC (Remote Procedure Call) is prefered over REST due we are calling a procedure instead of a entity maintenance (CRUD)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('generateMultipleIpReport')
  @UsePipes(new ValidationPipe({ transform: true }))
  generateMultipleIpReport(@Body() report: ReportDto): Observable<Report[]> {
    return this.reportService
      .generateMultipleReport(report.ip, report.reportServices)
      .pipe(
        switchMap(ipReports =>
          from(ipReports).pipe(
            map(ipReport => new Report(ipReport)),
            toArray(),
          ),
        ),
      );
  }
}
