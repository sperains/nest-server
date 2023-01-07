import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EventsGateway } from './gateway/events.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    CoreModule,
    PrismaModule,
    UserModule,
    ConfigModule,
    WinstonModule.forRoot({
      level: 'info',
      format: format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new transports.File({
          filename: 'logs/combined.log',
        }),
        new transports.DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d',
        }),
      ],
    }),
  ],
  controllers: [AppController],

  providers: [AppService, EventsGateway],
})
export class AppModule {}
