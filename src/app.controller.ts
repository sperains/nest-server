import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ApiMessage } from './core/decorator/api-message.decorator';
import { Public } from './core/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  @Get()
  @Public()
  getHello(): string {
    console.log(this.config);
    return this.appService.getHello();
  }

  @Get('error')
  getError() {
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
