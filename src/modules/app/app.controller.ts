import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('')
  getSystemInformation(): string {
    return 'Please visit https://github.com/brq-cr/nestjs-rx-workers-poc for more information about this application.';
  }

  @Get('status')
  @ApiOperation({ summary: 'Use this endpoint to check if server is running' })
  getSystemStatus(): string {
    return 'System is up and running.';
  }
}
