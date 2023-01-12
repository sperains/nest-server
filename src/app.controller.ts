import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiMessage } from './core/decorator/api-message.decorator';

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

    // console.log((null as any).toString());

    throw new HttpException('bad gateway', HttpStatus.BAD_GATEWAY);
  }

  @Get('timeout')
  async timeout() {
    await sleep(3000);

    return 'sleep';
  }

  @Get('api-msg')
  @ApiMessage('hello world')
  apiMessage() {
    return 'api message from decorator';
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
