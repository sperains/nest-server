import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EventsGateway } from './gateway/events.gateway';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    CoreModule,
    UserModule,
    ConfigModule,
    WinstonModule.forRoot({
      level: 'info',
      format: format.json(),
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
          level: 'error',
        }),
      ],
    }),
  ],
  controllers: [AppController],

  providers: [AppService, EventsGateway],
})
export class AppModule {}
