import { Module } from '@nestjs/common';
import 'winston-daily-rotate-file';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/auth/auth.module';
import { CoreModule } from '@/core/core.module';
import { EventsGateway } from '@/gateway/events.gateway';
import { UserModule } from '@/api/user/user.module';

@Module({
  imports: [CoreModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
