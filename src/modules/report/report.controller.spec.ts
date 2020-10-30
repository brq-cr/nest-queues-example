import { Test, TestingModule } from '@nestjs/testing';
import { generate, of } from 'rxjs';
import { ReportController } from './report.controller';
import { ReportDto } from './report.dto';
import { ReportService } from './report.service';
import { Report } from './report.transformer';
import { IPReport, IPReportServices } from './report.types';

describe('reportController', () => {
  let reportController: ReportController;
  let reportService: ReportService;

  beforeEach(async () => {
    const reportModule: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportService],
    }).compile();

    reportController = reportModule.get<ReportController>(ReportController);
    reportService = reportModule.get<ReportService>(ReportService);
  });

  describe('Generate Multiple Ip Report', () => {
    it('should return a list of reports', done => {
      const reportsReponse: IPReport[] = [
        {
          reportService: IPReportServices.Ipapi,
          data: {
            ip: '8.8.8.8',
            countryName: 'United States',
            countryCode: 'USA',
            regionCode: 'MR',
          },
        },
      ];
      const reportsControllerResult: Report[] = reportsReponse.map(
        report => new Report(report),
      );
      const reportInput: ReportDto = {
        ip: '8.8.8.8',
        reportServices: [IPReportServices.Ipapi],
      };
      const reportSpy = jest
        .spyOn(reportService, 'generateMultipleReport')
        .mockImplementation(() => of(reportsReponse));
      reportController.generateMultipleIpReport(reportInput).subscribe(data => {
        expect(data).toStrictEqual(reportsControllerResult);
        expect(reportSpy).toBeCalledTimes(1);
        done();
      });
    });
  });
});
