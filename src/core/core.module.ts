import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },

    PrismaService,
  ],

  exports: [PrismaService],
})
export class CoreModule {}
