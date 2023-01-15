import loggerConfig from '@/config/logger.config';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { PrismaService } from './services/prisma.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },

    { provide: APP_GUARD, useClass: JwtAuthGuard },

    PrismaService,
  ],

  exports: [PrismaService],
})
export class CoreModule {}
