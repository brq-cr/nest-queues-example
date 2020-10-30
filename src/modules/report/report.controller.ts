import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReportDto } from './report.dto';
import { ReportService } from './report.service';
import { IPReport } from './report.types';

@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  // RPC (Remote Procedure Call) is prefered over REST due we are calling a procedure instead of a entity maintenance (CRUD)
  @Post('generateMultipleIpReport')
  @UsePipes(new ValidationPipe({ transform: true }))
  generateMultipleIpReport(@Body() report: ReportDto): Observable<IPReport[]> {
    return this.reportService.generateMultipleReport(
      report.ip,
      report.reportServices,
    );
  }
}
