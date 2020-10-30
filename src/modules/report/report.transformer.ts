import { Exclude } from 'class-transformer';
import { IPReport } from './report.types';

export class Report {
  reportService: string;
  countryCode: string;
  countryName: string;
  regionName: string;

  @Exclude()
  ip: string;

  constructor(partial: Partial<IPReport>) {
    Object.assign(this, {
      ...partial.data,
      reportService: partial.reportService,
    });
  }
}
