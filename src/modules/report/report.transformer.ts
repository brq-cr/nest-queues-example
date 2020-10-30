import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IPReport } from './report.types';

export class Report {
  @ApiProperty({ example: 'ipapi', description: 'Ip Report source' })
  reportService: string;

  @ApiProperty({ example: 'US', description: 'Ip Country Code' })
  countryCode: string;

  @ApiProperty({ example: 'United States', description: 'IP Country Name' })
  countryName: string;

  @ApiProperty({ example: 'CA', description: 'IP Region Code' })
  regionCode: string;

  @Exclude()
  ip: string;

  constructor(partial: Partial<IPReport>) {
    Object.assign(this, {
      ...partial.data,
      reportService: partial.reportService,
    });
  }
}
