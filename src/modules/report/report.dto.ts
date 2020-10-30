import { IsIP, IsNotEmpty } from 'class-validator';
import { IPReportServices } from './report.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ example: '8.8.8.8', description: 'IP v4 to build report' })
  @IsIP('4')
  ip: string;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'IP report services',
    example: [IPReportServices.Freegeoip, IPReportServices.Ipapi],
    type: [String],
  })
  @IsNotEmpty()
  reportServices: IPReportServices[] = [
    IPReportServices.Freegeoip,
    IPReportServices.Ipapi,
  ];
}
