import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Render,
  Req,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ApiMessage } from './core/decorators/api-message.decorator';
import { Public } from './core/decorators/public.decorator';
import { MultipartFile } from './core/types';

@Controller()
@Public()
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

  @Get('cookie')
  cookie(@Req() request: any) {
    return request.cookies;
  }

  @Public()
  @Post('upload')
  async fileUpload(@Body('file') files: MultipartFile[]) {
    files.forEach((file) => {
      const { filename, data } = file;

      const path = join(process.cwd(), 'static');

      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }

      const stream = createWriteStream(join(path, filename));

      stream.write(data);
      stream.end();
    });

    return {
      hello: 'world',
    };
  }

  @Public()
  @Render('index.hbs')
  @Get('mvc')
  renderIndex() {
    return {
      message: 'hello world',
    };
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
