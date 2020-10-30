import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { toArray, map, concatMap } from 'rxjs/operators';
import { ReportDto } from './report.dto';
import { ReportService } from './report.service';
import { Report } from './report.transformer';

@ApiTags('reports')
@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  // RPC (Remote Procedure Call) is prefered over REST due we are calling a procedure instead of a entity maintenance (CRUD)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('generateMultipleIpReport')
  @ApiOperation({ summary: 'Generate Multtiple IP Report' })
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully generated.',
    type: [Report],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  generateMultipleIpReport(@Body() report: ReportDto): Observable<Report[]> {
    return this.reportService
      .generateMultipleReport(report.ip, report.reportServices)
      .pipe(
        concatMap(ipReports =>
          from(ipReports).pipe(
            map(ipReport => new Report(ipReport)),
            toArray(),
          ),
        ),
      );
  }
}
