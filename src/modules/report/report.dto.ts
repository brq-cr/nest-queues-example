import { IsIP, IsNotEmpty } from 'class-validator';
import { IPReportServices } from './report.types';

export class ReportDto {
  @IsIP('4')
  ip: string;

  @IsNotEmpty()
  reportServices: IPReportServices[] = [
    IPReportServices.Freegeoip,
    IPReportServices.Ipapi,
  ];
}
