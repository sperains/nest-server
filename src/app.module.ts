import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EventsGateway } from './gateway/events.gateway';

@Module({
  imports: [CoreModule],
  controllers: [AppController],

  providers: [AppService, EventsGateway],
})
export class AppModule {}
