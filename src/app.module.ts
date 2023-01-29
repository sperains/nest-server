import { Module } from '@nestjs/common';
import 'winston-daily-rotate-file';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/auth/auth.module';
import { CoreModule } from '@/core/core.module';
import { EventsGateway } from '@/gateway/events.gateway';
import { UserModule } from '@/api/user/user.module';
import { PublicModule } from './api/public/public.module';

@Module({
  imports: [CoreModule, UserModule, AuthModule, PublicModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
