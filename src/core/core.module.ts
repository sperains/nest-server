import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import configuration from '@/config/configuration';
import loggerConfig from '@/config/logger.config';
import rateLimitConfig from '@/config/rate-limit.config';
import staticConfig from '@/config/static.config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ThrottlerModule.forRoot(rateLimitConfig),
    ServeStaticModule.forRootAsync(staticConfig),
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },

    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },

    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },

    PrismaService,
  ],

  exports: [PrismaService],
})
export class CoreModule {}
