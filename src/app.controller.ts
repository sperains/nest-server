import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError() {
    console.log('bad gateway');

    console.log((null as any).toString());

    return new HttpException('bad gateway', HttpStatus.BAD_GATEWAY);
  }

  @Get('timeout')
  async timeout() {
    await sleep(3000);

    return 'sleep';
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
