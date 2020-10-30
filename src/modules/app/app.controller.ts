import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('')
  getSystemInformation(): string {
    return 'Please visit https://github.com/brq-cr/nestjs-rx-workers-poc for more information about this application.';
  }

  @Get('status')
  getSystemStatus(): string {
    return 'System is up and running.';
  }
}
