import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import loggerConfig from './config/logger.config';
import { CoreModule } from './core/core.module';
import { EventsGateway } from './gateway/events.gateway';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, UserModule, WinstonModule.forRoot(loggerConfig)],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
