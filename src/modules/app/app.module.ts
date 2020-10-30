import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ReportModule } from './../report/report.module';


@Module({
  imports: [ReportModule],
  controllers: [AppController],
})
export class AppModule {}
